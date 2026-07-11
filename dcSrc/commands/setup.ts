import { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    ChatInputCommandInteraction,
    ButtonInteraction,
    Embed,
    MessageFlags
} from 'discord.js';
import {db} from '../../database/database';
import { getWelcomeEmbed, getServerSetupEmbed, buttonRow, buttonChannelRow, buttonRoleRow, buttonServerRow } from '../components/embeds/setupEmbeds';

export const data = new SlashCommandBuilder() 
        .setName('setup')
        .setDescription('Starts the Battlefield 1 Server Management Bot setup assistant.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
        
export async function execute(interaction: ChatInputCommandInteraction) {
    const welcomeEmbed = getWelcomeEmbed(interaction);
    const serverEmbed = getServerSetupEmbed(interaction);
    const guildId = interaction.guildId!;
    let currentStep = 0;
    try{
        const dbget = await db.query('SELECT setup_steps FROM server_configs WHERE guild_id = $1', [guildId]);
        if(dbget.rows.length > 0) {
            currentStep = dbget.rows[0].setup_steps;
        }  else {
            await db.query('INSERT INTO server_configs (guild_id, setup_steps, setup_user_id) VALUES ($1, $2, $3)', [guildId, 0, interaction.user.id]);
            currentStep = 0;
        }
        if (dbget.rows.length === 0 || currentStep === 0) {

            return await interaction.editReply({
                embeds: [welcomeEmbed],
                components: [buttonRow]
            });
        } else if (currentStep === 1) {
            return await interaction.editReply({
                embeds: [serverEmbed],
                components: [buttonServerRow]
            });
        } else {
            return await interaction.editReply({
                content: 'The setup has already been completed. If you need to reconfigure the bot, please use the `/reset` command first.',
                components: []
            })
        }
    
    } catch (error) {
        console.error('Error sending embed:', error);
        await interaction.editReply({ 
            content: 'There was an error while executing this command!'
        });
    }
}