"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const onboardingLogic_1 = require("../onboarding/onboardingLogic");
const interactionCreateEvent = ({ client, params: [interaction] }) => {
    if (!interaction.guild || !interaction.channel || !('permissionsFor' in interaction.channel))
        return;
    const me = interaction.guild.members.me;
    if (!me || !interaction.channel.permissionsFor(me)?.has([discord_js_1.PermissionsBitField.Flags.SendMessages, discord_js_1.PermissionsBitField.Flags.ViewChannel]))
        return;
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.reply({ content: "Cette commande n'éxiste pas ou n'éxiste plus.", ephemeral: true });
        const botPermissions = command.help.botPermissions;
        if (botPermissions && botPermissions.length > 0 && !interaction.channel.permissionsFor(me)?.has(botPermissions)) {
            return interaction.reply({
                content: `Je n'ai pas les permissions suffisantes, veuilliez m'ajouter les permissions suivantes: ${new discord_js_1.PermissionsBitField(botPermissions).toArray().map(perm => `\`${perm}\``).join(', ')}.`,
                ephemeral: true
            });
        }
        command.run({ client, interaction });
    }
    else if (interaction.isAutocomplete()) {
        const autocomplete = client.autocompletes.get(interaction.commandName);
        if (!autocomplete)
            return;
        autocomplete.run({ client, interaction });
    }
    else if (interaction.isModalSubmit()) {
        const params = interaction.customId.split(':');
        const modalId = params[0];
        if (!modalId)
            return;
        const modal = client.modals.get(modalId);
        if (!modal)
            return interaction.reply({ content: "Cette modale n'éxiste pas ou n'éxiste plus.", ephemeral: true });
        modal.run({ client, interaction });
    }
    else if (interaction.isButton() || interaction.isAnySelectMenu()) {
        const params = interaction.customId.split(':');
        const customId = params[0];
        if (!customId)
            return;
        if (customId.startsWith('onboarding_')) {
            return (0, onboardingLogic_1.handleOnboardingInteraction)(client, interaction);
        }
    }
};
exports.default = interactionCreateEvent;
//# sourceMappingURL=interactionCreate.js.map