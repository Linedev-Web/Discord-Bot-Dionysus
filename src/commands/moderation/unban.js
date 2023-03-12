const {PermissionsBitField, escapeMarkdown} = require("discord.js");
module.exports = {
    run: async ({interaction}) => {
        const user = interaction.options.getUser('id-utilisateur');
        const reason = interaction.options.getString('raison');

        if (!user) return interaction.reply({content: 'Utilisateur nom trouvé.'});
        if (!await interaction.guild.bans.fetch(user.id).catch(() => false)) return interaction.reply({content: "Cet utilisateur n'est pas banni."});

        interaction.guild.members.unban(user.id, `${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`);

        interaction.reply({
            content: `J'ai correctement débanni **${escapeMarkdown(user.tag)}** du serveur`,
            ephemeral: true
        });

    },
    help: {
        description: "Débanni un utilisateur via son identifiant.",
        botPermissions: [PermissionsBitField.Flags.BanMembers],
        memberPermissions: [PermissionsBitField.Flags.BanMembers],
        examples: ['utilisateur: xxxxxx#0000 raison: Devenue sage'],

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