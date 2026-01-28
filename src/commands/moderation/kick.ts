import { PermissionsBitField, escapeMarkdown, GuildMember } from "discord.js";
import { Command } from "../../types";

const kickCommand: Command = {
    run: async ({ client, interaction }) => {
        const member = interaction.options.getMember("membre") as GuildMember;
        const reason = interaction.options.getString('raison');

        if (!member) return interaction.reply({ content: "Membre non trouvé.", ephemeral: true });
        if (!interaction.guild) return;

        if (member.id === interaction.user.id) return interaction.reply({ content: "Vous ne pouvez pas vous expulser vous-même.", ephemeral: true });
        if (member.id === client.user?.id) return interaction.reply({ content: "Vous ne pouvez pas me expulser.", ephemeral: true });
        if (member.id === interaction.guild.ownerId) return interaction.reply({ content: "Vous ne pouvez pas expulser le propriétaire du serveur.", ephemeral: true });

        const executor = interaction.member as GuildMember;
        if (interaction.user.id !== interaction.guild.ownerId && executor.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply({ content: "Vous ne pouvez pas expulser ce membre, vous n'êtes pas assez haut dans la hiérarchie des rôles.", ephemeral: true });
        }
        if (member.kickable === false) {
            return interaction.reply({ content: "Je ne peux pas expulser ce membre. Vérifiez que je suis au dessus de lui dans la hiérarchie des rôles.", ephemeral: true });
        }

        await member.kick(`${reason || "Aucune raison spécifiée"} (${interaction.user.tag})`);

        interaction.reply({
            content: `J'ai correctement expulsé **${escapeMarkdown(member.user.tag)}** du serveur`, 
            ephemeral: true
        });

    },
    help: {
        description: "Expulse un membre.",
        botPermissions: [PermissionsBitField.Flags.KickMembers],
        memberPermissions: [PermissionsBitField.Flags.KickMembers],
        examples: ['membre: @Membre raison: Pas sage'],
        options: [{
            name: "membre", description: "Le membre à expulser.", type: 6, required: true
        }, {
            name: "raison", description: "La raison de l'expulsion", type: 3, required: true
        }]
    }
};

export default kickCommand;
