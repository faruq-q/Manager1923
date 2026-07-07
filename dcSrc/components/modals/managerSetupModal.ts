import { MessageFlags, EmbedBuilder, ModalSubmitInteraction } from 'discord.js';
import { customClient } from '../../structures/CustomClient';
import { db } from '../../../database/database'; 
export const customId = 'managerSetupModal';

export async function execute(interaction: ModalSubmitInteraction, client: customClient) {
    // Defer reply immediately as ephemeral to bypass the 3-second constraint
    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

    // Parse credentials submitted from the modal UI text fields
    const botName = interaction.fields.getTextInputValue('botNameModal') || 'Manager1923';
    const sid = interaction.fields.getTextInputValue('botSidModal');
    const remid = interaction.fields.getTextInputValue('botRemidModal');
    
    // Extract Guild ID and the Setup Manager's Discord ID
    const guildId = interaction.guildId;
    const setupUserId = interaction.user.id;

    try {
        // Write or Update records utilizing an UPSERT pattern
        const queryText = `
            INSERT INTO server_configs (guild_id, setup_user_id, bot_name, ea_sid, ea_remid, updated_at)
            VALUES ($1, $2, $3, $4, $5, NOW())
            ON CONFLICT (guild_id) 
            DO UPDATE SET setup_user_id = $2, bot_name = $3, ea_sid = $4, ea_remid = $5, updated_at = NOW();
        `;
        
        await db.query(queryText, [guildId, setupUserId, botName, sid, remid]);

        const successEmbed = new EmbedBuilder()
            .setColor('#2ECC71')
            .setTitle('⚙️ Phase 1 Setup Completed Successfully!')
            .setThumbnail('https://i.imgur.com/d1RbcCd.jpeg')
            .setDescription(`The initial account configurations for **${interaction.guild?.name}** have been securely saved.`)
            .addFields(
                { name: '🤖 Bot Profile Name', value: `\`${botName}\``, inline: true },
                { name: '🛠️ Configured By', value: `<@${setupUserId}>`, inline: true },
                { name: '📡 Database Connection', value: '🟢 Connected & Saved', inline: true },
                { name: '🚀 Next Steps', value: 
                  'Your bot account session is now configured. Next, we will proceed with:\n' +
                  '• Assigning server names / GameIDs\n' +
                  '• Configuring logger channels & Staff Roles\n' +
                  '• Initializing the player report system' 
                }
            )
            .setFooter({ text: 'Manager1923 | Phase 1/8 Completed' })
            .setTimestamp();

        await interaction.editReply({ embeds: [successEmbed] });

    } catch (error) {
        console.error('Database configuration write error:', error);
        
        const failureMessage = '❌ **Database Error!** There was an unexpected error writing the configuration to our database. Please check your system logs.';
        
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: failureMessage });
        } else {
            // FIXED: Changed from editReply to reply for the non-deferred fallback path
            await interaction.reply({ content: failureMessage, flags: [MessageFlags.Ephemeral] });
        }
    }
}