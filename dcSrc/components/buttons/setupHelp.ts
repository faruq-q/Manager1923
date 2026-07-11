import { 
    EmbedBuilder,
    ButtonInteraction,
    MessageFlags
} from 'discord.js';
import {db} from '../../../database/database';
import { backButtonRow, backServerButtonRow } from '../embeds/setupEmbeds';
export const customId = ['btn_help_setup', 'btn_help_server_setup'];

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

export const helpGameIDEmbed = new EmbedBuilder()
    .setColor('#3498DB')
    .setTitle('How to Retrieve Battlefield 1 Server GameID?')
    .setThumbnail('https://i.imgur.com/d1RbcCd.jpeg')
    .setDescription('To manage server, Mamanger1923 need Server GameID(s) for use commands for usage.')
    .addFields(
        { name: '🌐 1. Go to Gametools', value: 'Open any browser and go to [gametools.network](https://gametools.network/servers?game=bf1&region=all&platform=pc&limit=10&searchtype=servername).' },
        { name: '🛠️ 2. Search for your server(s)', value: 'Use search bar in website and search for your server(s) with name.' },
        { name: '🔑 4. Copy Values', value: 'Find and click your server(s). Copy numbers in website link (bf/gameid/**123456789**/) from the browser search bar.' },
        { name: '❤️ Thanks to Gametools', value: 'Thank you Arcur.'}
    )
    .setFooter({ text: 'Manager1923 | find GameID steps' })
    .setTimestamp();

export async function execute(interaction: ButtonInteraction) {
    const dbget = await db.query('SELECT setup_steps FROM server_configs WHERE guild_id = $1', [interaction.guildId]);
    const currentStep = dbget.rows[0].setup_steps;
    try {
        if (currentStep === 0) {
            return await interaction.update({
                embeds: [helpEmbed],
                components: [backButtonRow]
            })
        } else if (currentStep === 1){
            return await interaction.update({
                embeds: [helpGameIDEmbed],
                components: [backServerButtonRow]
            })
        } else {
            return await interaction.update({
                content: 'Unexpected setup step. Please start the setup process again.',
                components: []
            })
        }
    } catch (error) {
        console.error('Error sending embed:', error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}