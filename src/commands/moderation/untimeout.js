const {PermissionsBitField, escapeMarkdown} = require("discord.js");
module.exports = {
    run: async ({interaction}) => {
        const member = interaction.options.getMember('membre');
        const reason = interaction.options.getString('raison');

        if (!member) return interaction.reply({content: 'Membre nom trouvé.'});
        if (!member.isCommunicationDisabled()) return interaction.reply({content: "Cet membre n'est pas muet."});
        if (interaction.user.id !== interaction.guild.ownerId && interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({content: "Vous ne pouvez pas enlever la mise en sourdine de ce membre, vous n'êtes pas assez haut dans la hiérarchie des rôles."});
        if (member.moderatable === false) return interaction.reply({content: "Je ne peux pas muet ce membre. Vérifiez que je suis au dessus de lui dans la hiérarchie des rôles."});
        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({content: "Je ne peux pas enlever la mise en sourdine de ce membre. vérifier que je suis au-dessus de lui dans la hiérachie des rôles."});


        await member.timeout(null, `${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`);

        interaction.reply({
            content: `J'ai correctement enlevé la mise en sourdine de **${escapeMarkdown(member.user.tag)}** sur le serveur`,
            ephemeral: true
        });

    },
    help: {
        description: "Enlever la mise en sourdine d'un membre.",
        botPermissions: [PermissionsBitField.Flags.ModerateMembers],
        memberPermissions: [PermissionsBitField.Flags.ModerateMembers],
        options: [
            {
                name: 'membre',
                description: "Le membre auquel enlever le mise en sourdine.",
                type: 6,
                required: true
            }, {
                name: 'raison',
                description: "La raison pour lequelle le membre n'est plus muet.",
                type: 3
            }
        ]
    }
};