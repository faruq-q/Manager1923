import {Events, REST, Routes} from 'discord.js';
import { customClient } from '../structures/CustomClient';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: customClient) {
    
    if (!client.user || !client.application) return;

    const token = process.env.DISCORD_TOKEN;
    const guildId = process.env.TEST_GUILD_ID;

    if (!token || !guildId) {
        console.error('Discord token or test guild ID not found in environment variables.');
        return;
    }

    console.log(`Bot is ready. Logged in as ${client.user.tag}`);

    const commandsData = client.commands.map(cmd => cmd.data.toJSON());
    const rest = new REST({ version: '10' }).setToken(token);

        try {
            console.log(`Started refreshing ${commandsData.length} application (/) commands.`);
            commandsData.forEach((cmd, index) => {
            console.log(`🔍 [DEDEKTİF] Sıra: ${index} | Gönderilen Komut Adı: "${cmd.name}"`);
            });
            if(guildId) {
                await rest.put(
                    Routes.applicationGuildCommands(client.user.id, guildId),
                    { body: commandsData }
                );
                console.log(`Successfully reloaded ${commandsData.length} application (/) commands.`);
            } else {
                await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: commandsData }
                );
                console.log(`Successfully reloaded ${commandsData.length} application (/) commands.`);
            }
        } catch (error) {
            console.error(error);
        }
};