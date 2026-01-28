import { PermissionsBitField, GuildMember } from "discord.js";
import { Command } from "../../types";

const userInfoCommand: Command = {
    run: async ({ interaction }) => {
        const member = (interaction.options.getMember("member") || interaction.member) as GuildMember;
        interaction.reply({
            embeds: [{
                color: member.displayColor,
                author: { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() },
                thumbnail: { url: member.user.displayAvatarURL({ size: 2048, extension: "png" }) },
                fields: [
                    { name: "Membre", value: member.toString(), inline: true },
                    { name: "ID du membre", value: member.id.toString(), inline: true },
                    { name: "Pseudo sur le serveur", value: member.nickname || "Aucun pseudo", inline: false },
                    {
                        name: "Boosts",
                        value: member.premiumSinceTimestamp ? `<t:${Math.floor(member.premiumSinceTimestamp / 1000)}:R>` : "Aucun Boost",
                        inline: false
                    },
                    {
                        name: "Date de création du compte",
                        value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`,
                        inline: false
                    },
                    {
                        name: "Date d'arrivée sur le serveur",
                        value: member.joinedTimestamp ? `<t:${Math.floor(member.joinedTimestamp / 1000)}> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)` : "Inconnue",
                        inline: false
                    }
                ],
                image: { url: member.user.displayAvatarURL({ size: 2048, extension: "png" }) }
            }]
        });
    },
    help: {
        description: "Affiche les informations d'un utilisateur",
        memberPermissions: [PermissionsBitField.Flags.EmbedLinks] as any,
        examples: ['membre: @Utilisateur'],
        options: [{
            name: "member",
            description: "Utilisateur dont vous voulez voir les informations",
            type: 6,
        }]
    }
};

export default userInfoCommand;
