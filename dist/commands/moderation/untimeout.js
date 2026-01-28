"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const untimeoutCommand = {
    run: async ({ interaction }) => {
        const member = interaction.options.getMember('membre');
        const reason = interaction.options.getString('raison');
        if (!member)
            return interaction.reply({ content: 'Membre non trouvé.', ephemeral: true });
        if (!interaction.guild)
            return;
        if (!member.isCommunicationDisabled())
            return interaction.reply({ content: "Cet membre n'est pas muet.", ephemeral: true });
        const executor = interaction.member;
        if (interaction.user.id !== interaction.guild.ownerId && executor.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply({ content: "Vous ne pouvez pas enlever la mise en sourdine de ce membre, vous n'êtes pas assez haut dans la hiérarchie des rôles.", ephemeral: true });
        }
        if (member.moderatable === false) {
            return interaction.reply({ content: "Je ne peux pas enlever la mise en sourdine de ce membre. Vérifiez que je suis au dessus de lui dans la hiérarchie des rôles.", ephemeral: true });
        }
        const me = interaction.guild.members.me;
        if (me && me.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply({ content: "Je ne peux pas enlever la mise en sourdine de ce membre. Vérifiez que je suis au-dessus de lui dans la hiérachie des rôles.", ephemeral: true });
        }
        await member.timeout(null, `${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`);
        interaction.reply({
            content: `J'ai correctement enlevé la mise en sourdine de **${(0, discord_js_1.escapeMarkdown)(member.user.tag)}** sur le serveur`,
            ephemeral: true
        });
    },
    help: {
        description: "Enlever la mise en sourdine d'un membre.",
        botPermissions: [discord_js_1.PermissionsBitField.Flags.ModerateMembers],
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.ModerateMembers],
        examples: ['membre: @Membre raison: Parle moins'],
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
exports.default = untimeoutCommand;
//# sourceMappingURL=untimeout.js.map