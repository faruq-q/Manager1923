const {Client, GatewayIntentBits, Collection} = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.GuildMember],
    presence: {
        activities: [{ 
            name: 'Manager1923 | Battlefield 1 Server Management Tool.', 
            type: ActivityType.GAME
        }],
    status: 'idle'
  }
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

const commandsPath = path.join(__dirname, "commands");
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filepath = path.join(commandsPath, file);
        const command = require(filepath);
        if ('data' in command && 'execute' in command.data) {
            client.commands.set(command.data.name, command);
        }
    }
}

const componentsPath = path.join(__dirname, "components");
if (fs.existsSync(componentsPath)) {
    const subFolders = ['buttons', 'selectMenus', 'modals'];

    subFolders.forEach(subFolder => {
        const folderPath = path.join(componentsPath, subFolder);
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

            for (const file of files) {
                const filepath = path.join(folderPath, file);
                const component = require(filepath);

                if (subFolder === 'buttons') client.buttons.set(component.data.customId, component);
                if (subFolder === 'selectMenus') client.selectMenus.set(component.data.customId, component);
                if (subFolder === 'modals') client.modals.set(component.data.customId, component);

            }
        }
    });
}

const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
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

client.login(process.env.DISCORD_TOKEN);

module.exports = client;