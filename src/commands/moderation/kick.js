const {PermissionsBitField, escapeMarkdown} = require("discord.js");
module.exports = {
    run: async ({client, interaction}) => {

        const member = interaction.options.getMember("membre");
        const reason = interaction.options.getString('raison');

        if (!member) return interaction.reply({content: "Membre nom trouvé."});
        if (member.id === interaction.user.id) return interaction.reply({content: "Vous ne pouvez pas vous expulser vous-même."});
        if (member.id === client.user.id) return interaction.reply({content: "Vous ne pouvez pas m'expulser."});
        if (member.id === interaction.guild.ownerId) return interaction.reply({content: "Vous ne pouvez pas expulser le propriétaire du serveur."});

        if (interaction.user.id !== interaction.guild.ownerId && interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({content: "Vous ne pouvez pas expulser ce membre, vous n'êtes pas assez haut dans la hiérarchie des rôles."});
        if (member.kickable === false) return interaction.reply({content: "Je ne peux pas expulser ce membre. Vérifiez que je suis au dessus de lui dans la hiérarchie des rôles."});


        await member.kick(`${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`);

        interaction.reply({
            content: `J'ai correctement expulsé **${escapeMarkdown(member.user.tag)}** du serveur`, ephemeral: true
        });

    }, help: {
        description: "Expluse un membre.",
        botPermissions: [PermissionsBitField.Flags.KickMembers],
        memberPermissions: [PermissionsBitField.Flags.KickMembers],
        examples: ['membre: xxxxxx#0000 raison: Pas sage'],

        options: [{
            name: "membre", description: "Le membre à expulser.", type: 6, required: true
        }, {
            name: "raison", description: "La raison de l'expulsion", type: 3, required: true
        }]
    }
};