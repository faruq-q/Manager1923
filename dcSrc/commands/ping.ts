import {SlashCommandBuilder, ChatInputCommandInteraction} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

export async function execute(interaction: ChatInputCommandInteraction) {
    const think = await interaction.deferReply();

    const latency = think.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply({
        content: `🏓 Pong! \n\nAPI Latency: ${latency}ms\nBot Latency: ${Math.round(interaction.client.ws.ping)}ms`,
    });
};