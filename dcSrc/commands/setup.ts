import { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle,
    ChatInputCommandInteraction,
    ButtonInteraction
} from 'discord.js';

export const data = new SlashCommandBuilder() 
        .setName('setup')
        .setDescription('Starts the Battlefield 1 Server Management Bot setup assistant.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

// Placeholder logo URL for the bot
export const botLogoURL = 'https://i.imgur.com/d1RbcCd.jpeg'; 

// Build the English welcome interface with all 8 configuration steps listed
export const welcomeEmbed = new EmbedBuilder()
    .setColor('#E14A0A') // Battlefield 1 Orange theme color
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
    .setFooter({ text: 'Manager1923 | Battlefield 1 Automated Admin Tools', iconURL: botLogoURL })
    .setTimestamp();

// Create the primary interactive buttons
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

export async function execute(interaction: ChatInputCommandInteraction) {
    // REMOVED: interaction.deferReply() is already handled globally in interactionCreate.ts
    await interaction.editReply({
        embeds: [welcomeEmbed],
        components: [buttonRow]
    });
}