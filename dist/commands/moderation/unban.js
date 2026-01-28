"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const unbanCommand = {
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('id-utilisateur');
        const reason = interaction.options.getString('raison');
        if (!user)
            return interaction.reply({ content: 'Utilisateur non trouvé.', ephemeral: true });
        if (!interaction.guild)
            return;
        const isBanned = await interaction.guild.bans.fetch(user.id).catch(() => null);
        if (!isBanned)
            return interaction.reply({ content: "Cet utilisateur n'est pas banni.", ephemeral: true });
        await interaction.guild.members.unban(user.id, `${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`);
        interaction.reply({
            content: `J'ai correctement débanni **${(0, discord_js_1.escapeMarkdown)(user.tag)}** du serveur`,
            ephemeral: true
        });
    },
    help: {
        description: "Débanni un utilisateur via son identifiant.",
        botPermissions: [discord_js_1.PermissionsBitField.Flags.BanMembers],
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.BanMembers],
        examples: ['id-utilisateur: ID raison: Devenu sage'],
        options: [
            {
                name: 'id-utilisateur',
                description: "L'identifiant de l'utilisateur à débannir.",
                type: 6,
                required: true
            }, {
                name: 'raison',
                description: "La raison du débannissement.",
                type: 3
            }
        ]
    }
};
exports.default = unbanCommand;
//# sourceMappingURL=unban.js.map