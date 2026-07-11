import { MessageFlags, EmbedBuilder, ModalSubmitInteraction } from 'discord.js';
import { customClient } from '../../structures/CustomClient';
import { db } from '../../../database/database'; 
export const customId = 'managerSetupModal';

export async function execute(interaction: ModalSubmitInteraction, client: customClient) {
    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

    const botName = interaction.fields.getTextInputValue('botNameModal') || 'Manager1923';
    const sid = interaction.fields.getTextInputValue('botSidModal');
    const remid = interaction.fields.getTextInputValue('botRemidModal');
    const guildId = interaction.guildId;
    const setupUserId = interaction.user.id;
    
    const setupSteps = 1; 

    try {
        const queryText = `
            INSERT INTO server_configs (guild_id, setup_user_id, bot_name, ea_sid, ea_remid, created_at, updated_at, setup_steps)
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6)
            ON CONFLICT (guild_id) 
            DO UPDATE SET 
                setup_user_id = EXCLUDED.setup_user_id, 
                bot_name = EXCLUDED.bot_name, 
                ea_sid = EXCLUDED.ea_sid, 
                ea_remid = EXCLUDED.ea_remid, 
                setup_steps = EXCLUDED.setup_steps,
                updated_at = NOW(); 
        `;
        
        const queryParams = [
            guildId,       // $1
            setupUserId,   // $2
            botName,       // $3
            sid,           // $4
            remid,         // $5
            setupSteps     // $7
        ];

        await db.query(queryText, queryParams);

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

        await interaction.editReply({ embeds: [successEmbed], flags: [] });

    } catch (error) {
        console.error('Database configuration write error:', error);
        
        const failureMessage = '❌ **Database Error!** There was an unexpected error writing the configuration to our database. Please check your system logs.';
        
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: failureMessage, flags: [] });
        } else {
            await interaction.reply({ content: failureMessage, flags: [] });
        }
    }
}