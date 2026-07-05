const {REST, Routes} = require('discord.js');

module.exports = {
    name: 'clientReady',
    once: true,
    async execute(client) {
        console.log(`Bot is ready. Logged in as ${client.user.tag}`);

        const commands = [];
        client.commands.forEach(cmd => commands.push(cmd.data.toJSON()));

        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            await rest.put(
                Routes.applicationCommands(client.user.id, process.env.TEST_GUILD_ID),
                { body: commands },
            );
            console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    },
};