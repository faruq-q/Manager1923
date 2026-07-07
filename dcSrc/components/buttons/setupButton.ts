import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonInteraction } from 'discord.js';
export const customId = 'btn_start_setup';
export async function execute(interaction: ButtonInteraction) {
    // REMOVED: Unused and incorrect client: Guild parameter
    const modal = new ModalBuilder()
        .setCustomId('managerSetupModal')
        .setTitle('Manager1923 | BF1 Bot Setup');

    // Form inputs
    const botNameInput = new TextInputBuilder()
        .setCustomId('botNameModal')
        .setLabel('Bot Display Name (optional)')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('e.g. Manager1923 Seeder')
        .setRequired(false);

    const botSidInput = new TextInputBuilder()
        .setCustomId('botSidModal')
        .setLabel('Bot Account SID')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Enter EA Account SID cookie...')
        .setRequired(true);

    const botRemidInput = new TextInputBuilder()
        .setCustomId('botRemidModal')
        .setLabel('Bot Account REMID')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('Enter EA Account REMID cookie...')
        .setRequired(true);

    // Pack rows
    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(botNameInput);
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(botSidInput);
    const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(botRemidInput);

    modal.setComponents(row1, row2, row3);

    // Modals cannot be deferred; they must be shown directly via showModal
    await interaction.showModal(modal);
}