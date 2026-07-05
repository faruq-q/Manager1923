const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('setup')
        .setDescription('Sets up the bot by registering Battlefield 1 Bot account information and server configurations.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),


    async execute(interaction) {
        await interaction.reply('Setup command executed. Please follow the instructions to configure the bot.');
    },
};