import {SlashCommandBuilder, ChatInputCommandInteraction} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

export async function execute(interaction: ChatInputCommandInteraction) {
    try {
        const wsPing = interaction.client.ws.ping;

    await interaction.editReply({
        content: `🏓 Pong! <@${interaction.user.id}> \nBot Latency: ${Math.round(wsPing)}ms`,
    });
    } catch (error) {
        return await interaction.editReply({ content: 'There was an error trying to execute this command!' }); 
    }
};