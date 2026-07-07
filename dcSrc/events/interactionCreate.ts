import { ButtonInteraction, ChatInputCommandInteraction, Interaction, Events, MessageFlags, ModalSubmitInteraction } from "discord.js";
import { customClient } from '../structures/CustomClient';
export const name = Events.InteractionCreate;

// Standardized error message string for internal reuse
const errorMessage = '❌ There was an error while processing this request!';


// Handles all incoming button interactions
async function buttonHandler(interaction: ButtonInteraction, client: customClient) {
    const button = client.buttons.get(interaction.customId);
    
    if (!button) {
        console.log(`⚠️ [BUTTON REJECTED] Clicked button was not found in client.buttons!`);
        console.log(`🔍 Target CustomId: "${interaction.customId}"`);
        console.log(`📂 Currently registered button IDs:`, Array.from(client.buttons.keys()));

        return await interaction.reply({ 
            content: `❌ This button is not registered in the system! (CustomId: \`${interaction.customId}\`)`, 
            flags: [MessageFlags.Ephemeral] 
        });
    }

    try {
        await button.execute(interaction);
    } catch (error) {
        console.error('Button Interaction Failure:', error);
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: errorMessage });
        } else {
            await interaction.reply({ content: errorMessage, flags: [MessageFlags.Ephemeral] });
        }
    }
}

// Handles all incoming slash command interactions
async function slashCommandHandler(interaction: ChatInputCommandInteraction, client: customClient) {
    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`⚠️ [COMMAND NOT FOUND] /${interaction.commandName} is missing from memory!`);
        return await interaction.reply({
            content: `❌ The \`/${interaction.commandName}\` command is currently unavailable.`,
            flags: [MessageFlags.Ephemeral]
        });
    }

    await interaction.deferReply({ flags: [] });

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error('Command Execution Failure:', error);
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: errorMessage });
        } else {
            await interaction.reply({ content: errorMessage, flags: [MessageFlags.Ephemeral] });
        }
    }
}

// Handles all incoming modal submissions
async function modalHandler(interaction: ModalSubmitInteraction, client: customClient) {
    const modal = client.modals.get(interaction.customId);
    
    if (!modal) {
        console.log(`⚠️ [MODAL NOT FOUND] CustomId: "${interaction.customId}"`);
        return await interaction.reply({
            content: `❌ This form processing system is currently offline.`,
            flags: [MessageFlags.Ephemeral]
        });
    }

    try {
        await modal.execute(interaction, client);
    } catch (error) {
        console.error('Modal Submit Failure:', error);
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: errorMessage });
        } else {
            await interaction.reply({ content: errorMessage, flags: [MessageFlags.Ephemeral] });
        }
    }
}

// Main event router for interactionCreate
export async function execute(interaction: Interaction, client: customClient) {
    if (interaction.isChatInputCommand()) {
        return await slashCommandHandler(interaction, client);
    } 
    
    if (interaction.isButton()) {
        return await buttonHandler(interaction, client);
    } 
    
    if (interaction.isModalSubmit()) {
        return await modalHandler(interaction, client);
    }
}