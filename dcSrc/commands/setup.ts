import { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    ChatInputCommandInteraction,
    ButtonInteraction,
    Embed
} from 'discord.js';
import {db} from '../../database/database';
import { getWelcomeEmbed, getServerSetupEmbed, buttonRow, buttonChannelRow, buttonRoleRow, buttonServerRow } from '../components/embeds/setupEmbeds';

export const data = new SlashCommandBuilder() 
        .setName('setup')
        .setDescription('Starts the Battlefield 1 Server Management Bot setup assistant.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
        


export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ flags: [] });
    const welcomeEmbed = getWelcomeEmbed(interaction);
    const serverEmbed = getServerSetupEmbed(interaction);
    try{
        const dbget = await db.query('SELECT setup_steps FROM server_configs WHERE guild_id = $1', [interaction.guildId]);
        const currentStep = dbget.rows[0].setup_steps;
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
        }
    
    } catch (error) {
        console.error('Error sending embed:', error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}