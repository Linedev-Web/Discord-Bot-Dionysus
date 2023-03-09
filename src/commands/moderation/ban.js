const {PermissionsBitField, escapeMarkdown} = require("discord.js");
module.exports = {
    run: async ({client,interaction}) => {
        const user = interaction.options.getUser("utilisateur");
        const member = interaction.options.getMember("utilisateur");
        const reason = interaction.options.getString("raison");
        const deleteMessagesHistory = interaction.options.getString("supprimer-historique-message");

        if (!user) return interaction.reply({content: "Utilisateur nam trouvé."});

        if (await interaction.guild.bans.fetch(user.id).catch(() => null)) return interaction.reply({content: "Cet utilisateur est déjà banni."});

        if (user.id === interaction.user.id) return interaction.reply({content: "Vous ne pouvez pas vous bannir vous-même."});

        if (user.id === client.user.id) return interaction.reply({content: "Vous ne pouvez pas me bannir."});

        if (user.id === interaction.guild.ownerId) return interaction.reply({content: "Vous ne pouvez pas bannir le propriétaire du serveur."});

        if (member) {
            if (interaction.user.id !== interaction.guild.ownerId && interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({content: "Vous ne pouvez pas bannir ce membre, vous n'ées pas assez haut dans la hiérarchie des rôles."});
            if (member.bannable === false) return interaction.reply({content: "Je ne peux pas bannir ce membre. Vérifiez que suis au dessus de lui dans la hiérarchie des rôles."});
        }

        const messageHistorySeconds = {
            previous_hour: 60 * 60,
            previous_6_hour: 6 * 60 * 60,
            previous_12_hour: 12 * 60 * 60,
            previous_24_hour: 24 * 60 * 60,
            previous_3_days: 3 * 24 * 60 * 60,
            previous_7_days: 7 * 24 * 60 * 60
        };

        interaction.guild.members.ban(user.id, {
            reason: `${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`,
            deleteMessageSeconds: deleteMessagesHistory ? deleteMessagesHistory[messageHistorySeconds] : null
        });

        interaction.reply({
            content: `J'ai correctement banni **${escapeMarkdown(interaction.user.tag)}** du server.`, ephemeral: true
        });

    }, help: {
        description: "Bannir un utilisateur.",
        botPermissions: [PermissionsBitField.Flags.BanMembers],
        memberPermissions: [PermissionsBitField.Flags.BanMembers],
        options: [{
            name: "utilisateur", description: "L'utilisateur à bnnir", type: 6, required: true
        }, {
            name: "raison", description: "La raison du bannissement", type: 3, required: true
        }, {
            name: "supprimer-historique-message",
            description: "L'historique des messages à supprimer.",
            type: 3,
            choices: [{name: "Heure Précédente", value: "previous_hour"}, {
                name: "6 Heures Précédentes", value: "previous_6_hour"
            }, {name: "12 Heures Précédentes", value: "previous_12_hour"}, {
                name: "24 Heures Précédentes", value: "previous_24_hour"
            }, {name: "3 Jours Précédentes", value: "previous_3_days"}, {
                name: "7 Jours Précédentes", value: "previous_7_days"
            }]
        }]
    }
};