import { 
    EmbedBuilder,
    ButtonInteraction, 
    Guild,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle 
    } from 'discord.js';
import { getWelcomeEmbed, getServerSetupEmbed, buttonServerRow, buttonRow } from '../../components/embeds/setupEmbeds';
import { db } from '../../../database/database';
export const customId = ['btn_home_setup'];

export async function execute(interaction: ButtonInteraction) {
    const dbget = await db.query('SELECT setup_steps FROM server_configs WHERE guild_id = $1', [interaction.guildId]);
        const currentStep = dbget.rows[0].setup_steps;
    try {
        if (currentStep === 0) {
            return await interaction.update({ 
                embeds: [getWelcomeEmbed(interaction)],
                components: [buttonRow]
            });
        } else if (currentStep === 1) {
            return await interaction.update({
                embeds: [getServerSetupEmbed(interaction)],
                components: [buttonServerRow]
            });
        } else {
            return await interaction.update({
                content: 'Unexpected setup step. Please start the setup process again.',
                components: []
            })
        }
    } catch (error) {
    console.error('Error sending home embed:', error);
    await interaction.update({ content: 'There was an error while executing this command!', flags: [] });
    }
};