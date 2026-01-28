"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const convertToMilliseconds = function (value) {
    const regex = /^(\d+)([a-zA-Z]+)$/;
    const match = regex.exec(value.replace(/\s+/g, ''));
    if (!match || !match[1] || !match[2])
        return null;
    const amount = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    if (unit === 's' || unit.includes('sec'))
        return amount * 1000;
    if (unit === 'min')
        return amount * 60 * 1000;
    if (unit === 'h' || unit.includes('h'))
        return amount * 60 * 60 * 1000;
    if (unit === 'd' || unit.includes('d'))
        return amount * 24 * 60 * 60 * 1000;
    if (unit === 'w' || unit.includes('w'))
        return amount * 7 * 24 * 60 * 60 * 1000;
    return null;
};
const timeoutCommand = {
    run: async ({ client, interaction }) => {
        const member = interaction.options.getMember('membre');
        const durationStr = interaction.options.getString('durer');
        const reason = interaction.options.getString('raison');
        if (!member)
            return interaction.reply({ content: "Membre non trouvé.", ephemeral: true });
        if (!interaction.guild)
            return;
        const duration = durationStr ? convertToMilliseconds(durationStr) : null;
        if (member.isCommunicationDisabled())
            return interaction.reply({ content: "Ce membre est déjà mute.", ephemeral: true });
        if (member.id === interaction.user.id)
            return interaction.reply({ content: 'Vous ne pouvez pas vous rendre muet vous-même.', ephemeral: true });
        if (member.id === client.user?.id)
            return interaction.reply({ content: 'Vous ne pouvez pas me rendre muet.', ephemeral: true });
        if (member.id === interaction.guild.ownerId)
            return interaction.reply({ content: "Vous ne pouvez pas rendre muet le propriétaire du serveur.", ephemeral: true });
        const executor = interaction.member;
        if (interaction.user.id !== interaction.guild.ownerId && executor.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply({ content: "Vous ne pouvez pas muet ce membre, vous n'êtes pas assez haut dans la hiérarchie des rôles.", ephemeral: true });
        }
        if (member.moderatable === false) {
            return interaction.reply({ content: "Je ne peux pas muet ce membre. Vérifiez que je suis au dessus de lui dans la hiérarchie des rôles.", ephemeral: true });
        }
        if (!duration)
            return interaction.reply({ content: "Veuillez indiquer une durée de la mise en sourdine valide. Par exemple '1d' ou '1h'", ephemeral: true });
        if (duration > 28 * 24 * 60 * 60 * 1000)
            return interaction.reply({ content: "La durée maximale de la mise en sourdine est de 4 semaines.", ephemeral: true });
        await member.timeout(duration, `${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`);
        interaction.reply({
            content: `J'ai correctement rendu muet **${(0, discord_js_1.escapeMarkdown)(member.user.tag)}** sur le serveur.`,
            ephemeral: true
        });
    },
    help: {
        description: 'Rendre muet un membre',
        botPermissions: [discord_js_1.PermissionsBitField.Flags.ModerateMembers],
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.ModerateMembers],
        examples: ['membre: @Membre duree: 7h raison: Parle trop'],
        options: [
            {
                name: "membre",
                description: "Le membre à rendre muet.",
                type: 6,
                required: true
            }, {
                name: "durer",
                description: "La durée de la mise en sourdine.",
                type: 3,
                required: true
            }, {
                name: "raison",
                description: "La raison pour laquelle le membre est rendu muet.",
                type: 3,
            }
        ]
    }
};
exports.default = timeoutCommand;
//# sourceMappingURL=timeout.js.map