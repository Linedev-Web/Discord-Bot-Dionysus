"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const banCommand = {
    run: async ({ client, interaction }) => {
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        const reason = interaction.options.getString("raison");
        const deleteMessagesHistory = interaction.options.getString("supprimer-historique-message");
        if (!user)
            return interaction.reply({ content: "Utilisateur non trouvé.", ephemeral: true });
        if (!interaction.guild)
            return;
        if (await interaction.guild.bans.fetch(user.id).catch(() => null)) {
            return interaction.reply({ content: "Cet utilisateur est déjà banni.", ephemeral: true });
        }
        if (user.id === interaction.user.id)
            return interaction.reply({ content: "Vous ne pouvez pas vous bannir vous-même.", ephemeral: true });
        if (user.id === client.user?.id)
            return interaction.reply({ content: "Vous ne pouvez pas me bannir.", ephemeral: true });
        if (user.id === interaction.guild.ownerId)
            return interaction.reply({ content: "Vous ne pouvez pas bannir le propriétaire du serveur.", ephemeral: true });
        if (member) {
            const executor = interaction.member;
            if (interaction.user.id !== interaction.guild.ownerId && executor.roles.highest.position <= member.roles.highest.position) {
                return interaction.reply({ content: "Vous ne pouvez pas bannir ce membre, vous n'êtes pas assez haut dans la hiérarchie des rôles.", ephemeral: true });
            }
            if (member.bannable === false) {
                return interaction.reply({ content: "Je ne peux pas bannir ce membre. Vérifiez que je suis au dessus de lui dans la hiérarchie des rôles.", ephemeral: true });
            }
        }
        const messageHistorySeconds = {
            previous_hour: 60 * 60,
            previous_6_hour: 6 * 60 * 60,
            previous_12_hour: 12 * 60 * 60,
            previous_24_hour: 24 * 60 * 60,
            previous_3_days: 3 * 24 * 60 * 60,
            previous_7_days: 7 * 24 * 60 * 60
        };
        await interaction.guild.members.ban(user.id, {
            reason: `${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`,
            deleteMessageSeconds: deleteMessagesHistory ? messageHistorySeconds[deleteMessagesHistory] : undefined
        });
        interaction.reply({
            content: `J'ai correctement banni **${(0, discord_js_1.escapeMarkdown)(user.tag)}** du serveur.`,
            ephemeral: true
        });
    },
    help: {
        description: "Bannir un utilisateur.",
        botPermissions: [discord_js_1.PermissionsBitField.Flags.BanMembers],
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.BanMembers],
        examples: ['utilisateur: @Utilisateur raison: Pas sage', 'utilisateur: ID raison: Insulte supprimer-historique-message: 6 Heures Précédentes'],
        options: [{
                name: "utilisateur", description: "L'utilisateur à bannir", type: 6, required: true
            }, {
                name: "raison", description: "La raison du bannissement", type: 3, required: true
            }, {
                name: "supprimer-historique-message",
                description: "L'historique des messages à supprimer.",
                type: 3,
                choices: [
                    { name: "Heure Précédente", value: "previous_hour" },
                    { name: "6 Heures Précédentes", value: "previous_6_hour" },
                    { name: "12 Heures Précédentes", value: "previous_12_hour" },
                    { name: "24 Heures Précédentes", value: "previous_24_hour" },
                    { name: "3 Jours Précédents", value: "previous_3_days" },
                    { name: "7 Jours Précédents", value: "previous_7_days" }
                ]
            }]
    }
};
exports.default = banCommand;
//# sourceMappingURL=ban.js.map