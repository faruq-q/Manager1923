import { 
    EmbedBuilder,
    ButtonInteraction, 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';

// REQUIRED: Matches the ID in the button builder
export const customId = 'btn_help_setup';

export const helpEmbed = new EmbedBuilder()
    .setColor('#3498DB')
    .setTitle('How to Retrieve Battlefield 1 SID & REMID?')
    .setThumbnail('https://i.imgur.com/d1RbcCd.jpeg')
    .setDescription('To manage server, kick/ban players or run commands, the bot needs to authenticate via EA using your bot account\'s session tokens.')
    .addFields(
        { name: '🌐 1. Log in to EA', value: 'Open Firefox web browser, go to [ea.com](https://www.ea.com) and log in with your dedicated Battlefield 1 bot account.' },
        { name: '🛠️ 2. Open Developer Tools', value: 'Press `F12` or `Ctrl+Shift+I` on your keyboard, then navigate to the **Storage** (Firefox) tab.' },
        { name: '🍪 3. Find Cookies', value: 'Expand the **Cookies** section on the left sidebar and select `https://www.ea.com`.' },
        { name: '🔑 4. Copy Values', value: 'Search for the cookies named `sid` and `remid` in the list. Copy their long alphanumeric values separately and keep them secure.' },
        { name: '⚠️ Important Security Warning', value: '**Your `sid` and `remid` allow direct access to your account\'s EA profile. Never share them publicly or with anyone you do not trust. Your token is encrypted and saved privately.**' }
    )
    .setFooter({ text: 'Manager1923 | Safe and Encrypted Session Management' })
    .setTimestamp();

// Create the return button (Home Page)
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

// EXPLICITLY NO 'client' PARAMETER AS REQUESTED
export async function execute(interaction: ButtonInteraction) {
    try {
        await interaction.update({ 
            embeds: [helpEmbed],
            components: [backButtonRow] // Add the back button to the message
        });
    } catch (error) {
        console.error('Error updating to help embed:', error);
    }
}