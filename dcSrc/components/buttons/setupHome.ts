import { 
    EmbedBuilder,
    ButtonInteraction, 
    Guild,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle 
    } from 'discord.js';
import { welcomeEmbed } from '../../commands/setup';
export const customId = 'btn_home_setup';

export const backButtonRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('btn_start_setup')
            .setLabel('Start Setup')
            .setEmoji('⚙️')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId('btn_help_setup')
            .setLabel('How to get SID/REMID?')
            .setEmoji('❓')
            .setStyle(ButtonStyle.Secondary)
    );

export async function execute(interaction: ButtonInteraction) {
    try {
        
        await interaction.update({ 
            embeds: [welcomeEmbed],
            components: [backButtonRow]
        });
    } catch (error) {
    console.error('Error sending home embed:', error);
    await interaction.update({ content: 'There was an error while executing this command!', flags: [] });
    }
};