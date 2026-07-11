import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChatInputCommandInteraction, ButtonInteraction } from "discord.js";

export const botLogoURL = 'https://i.imgur.com/d1RbcCd.jpeg'; 
type setupInteraction = ChatInputCommandInteraction | ButtonInteraction;

export const getWelcomeEmbed = (interaction: setupInteraction) => {
    return new EmbedBuilder()
    .setColor('#02ad27')
    .setTitle('Manager1923 | Battlefield 1 Server Management Bot Setup')
    .setAuthor({ name: 'Manager1923 Assistant'})
    .setThumbnail(botLogoURL)
    .setDescription('Welcome to the setup assistant! This wizard will guide you through configuring your Battlefield 1 server management bot.')
    .addFields(
        { name: '📋 Configuration Steps Overview', value: 
          '**1.** Configure an admin/owner Battlefield 1 account credentials (**SID** and **REMID**).\n' +
          '**2.** Register game servers by their exact names or GameIDs.\n' +
          '**3.** Set up automated log channels (or assign existing custom ones).\n' +
          '**4.** Designate a **Kick-Only** role for basic in-game moderators.\n' +
          '**5.** Designate a **Ban & Kick** role for senior in-game moderators.\n' +
          '**6.** Designate a **Server Config Manager** role for bot settings.\n' +
          '**7.** Toggle and configure the player report system (special logger & staff role).\n' +
          '**8.** Additional customizable options to fit your community style.'
        },
        { name: 'ℹ️ Getting Started', value: 'Please click the **Start Setup** button below to provide initial credentials. If you do not know how to obtain your SID and REMID, click the **Need Help?** button.' }
    )
    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
    .setTimestamp();

}

export const getServerSetupEmbed = (interaction: setupInteraction) => {
    return new EmbedBuilder()
        .setColor('#E14A0A')
        .setTitle('Manager1923 | Battlefield 1 Server Management Bot Setup')
        .setAuthor({ name: 'Manager1923 Assistant'})
        .setThumbnail(botLogoURL)
        .setDescription('Please provide the **exact name** or **GameID** of your Battlefield 1 server(s). You can add multiple servers separated by commas.')
        .addFields(
            { name: '📝 Example Input', value: '`"ServerName1 - 7/24 Sinai - CQ","ServerName2 - All Maps #12345678", "1234567890"`' }
        )
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp();
}

export const getLogChannelOption = (interaction: setupInteraction) => {
    return new EmbedBuilder()
        .setColor('#e4ba00')
        .setTitle('Manager1923 | Battlefield 1 Server Management Bot Setup')
        .setAuthor({ name: 'Manager1923 Assistant'})
        .setThumbnail(botLogoURL)
        .setDescription('Create Log Channels')
        .addFields(
            { name: '📝 Default Channel Names', value: 
                'Vban Logs: `#bf1-vbans`\n'+
                'Ban Logs: `#bf1-kicks`\n'+
                'Kick Logs: `#bf1-bans`\n'+ 
                'Server Global Logs: `#bf1-server-updates`\n'+
                'Player Report Logs: `#bf1-reports`\n'+
                'Vote Kick Logs: `#bf1-votekicks`'
            }
        )
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp();
    
}

export const getChannelOption = (interaction: setupInteraction) => {
    return new EmbedBuilder()
        .setColor('#e4ba00')
        .setTitle('Manager1923 | Battlefield 1 Server Management Bot Setup')
        .setAuthor({ name: 'Manager1923 Assistant'})
        .setThumbnail(botLogoURL)
        .setDescription('Attach or Create Roles for commands usage. Example: Ban&Kick perm = @Admin, Only Kick Perm: @Moderator, etc..')
        .addFields(
            { name: '📝 Default Role Names', value: 
                'Server Manager Role: `@Manager`\n'+
                'Ban & Kick Perms: `@Admin`\n'+
                'Only Kick Perm:: `@Moderator`\n'+ 
                'In-game VIP Role: `@bf1Vip`\n'+
                'Report Inspecter: `@inspecter`\n'
            }
        )
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp();
    
}

export const getReportOption = (interaction: setupInteraction) => {
    return new EmbedBuilder()
        .setColor('#e4ba00')
        .setTitle('Manager1923 | Battlefield 1 Server Management Bot Setup')
        .setAuthor({ name: 'Manager1923 Assistant'})
        .setThumbnail(botLogoURL)
        .setDescription('Report system for players')
        .addFields(
            { name: '📝 Default Role Names', value: 
                'Server Manager Role: `@Manager`\n'+
                'Ban & Kick Perms: `@Admin`\n'+
                'Only Kick Perm:: `@Moderator`\n'+ 
                'In-game VIP Role: `@bf1Vip`\n'+
                'Report Inspecter: `@inspecter`\n'
            }
        )
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp();
    
}

export const buttonRow = new ActionRowBuilder<ButtonBuilder>()
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

export const buttonServerRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('btn_start_server_setup')
            .setLabel('Start Server(s) Setup')
            .setEmoji('⚙️')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId('btn_help_server_setup')
            .setLabel('How to get GameID?')
            .setEmoji('❓')
            .setStyle(ButtonStyle.Secondary)
    );

export const buttonRoleRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('btn_start_role_setup')
            .setLabel('Start Server(s) Setup')
            .setEmoji('⚙️')
            .setStyle(ButtonStyle.Success)
    );

export const buttonChannelRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('btn_start_channel_setup')
            .setLabel('Start Server(s) Setup')
            .setEmoji('⚙️')
            .setStyle(ButtonStyle.Success)
    );

export const backButtonRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('btn_start_setup')
            .setLabel('Start Setup')
            .setEmoji('⚙️')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId('btn_home_setup')
            .setLabel('Setup Home Page')
            .setEmoji('🏠')
            .setStyle(ButtonStyle.Primary)
    );

export const backServerButtonRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('btn_start_server_setup')
            .setLabel('Start Setup')
            .setEmoji('⚙️')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId('btn_home_setup')
            .setLabel('Setup Home Page')
            .setEmoji('🏠')
            .setStyle(ButtonStyle.Primary)
    );