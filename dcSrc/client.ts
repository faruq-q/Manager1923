import dotenv from 'dotenv';

dotenv.config();
import {Client, GatewayIntentBits, Collection, ClientOptions, Partials, Activity, ActivityType, CollectorEventTypes} from 'discord.js';
import { initDatabase } from '../database/database';
import { customClient } from './structures/CustomClient';
import fs from 'fs';
import path from 'path';

export const client = new customClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.GuildMember],
    presence: {
        activities: [{ 
            name: 'Manager1923 | Battlefield 1 Server Management Tool.', 
            type: ActivityType.Competing
        }],
    status: 'idle',
  }
});

// --- DEDEKTİF MODLU COMMANDS HANDLER ---
const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath);
    const tsFiles = commandFiles.filter(file => file.endsWith('.ts'));

    for (const file of tsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`✅ [DEDEKTİF] ${file} başarıyla hafızaya yüklendi! Komut Adı: /${command.data.name}`);
        } else {
            console.log(`❌ [DEDEKTİF] ${file} geçerli komut yapısına (data/execute) sahip değil, ATLANDI!`);
        }
    }
} else {
    console.log(`🚨 [DEDEKTİF] KRİTİK HATA: ${commandsPath} klasörü diskte fiziksel olarak yok!`);
}
console.log(`\n=================================\n`);

const componentsPath = path.join(__dirname, "components");
if (fs.existsSync(componentsPath)) {
    const subFolders = ['buttons', 'selectMenus', 'modals'];

    subFolders.forEach(subFolder => {
        const folderPath = path.join(componentsPath, subFolder);
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".ts"));

            for (const file of files) {
                const filepath = path.join(folderPath, file);
                const component = require(filepath);

                if (subFolder === 'buttons') client.buttons.set(component.customId, component);
                if (subFolder === 'selectMenus') client.selectMenus.set(component.customId, component);
                if (subFolder === 'modals') client.modals.set(component.customId, component);

            }
        }
    });
}

const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

initDatabase().then(() => {
    client.login(process.env.DISCORD_TOKEN);
}).catch((err) => {
    console.error('🚨 [CORE] Failed to start bot due to database error:', err);
});