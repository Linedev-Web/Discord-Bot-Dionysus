"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const userInfoCommand = {
    run: async ({ interaction }) => {
        const member = (interaction.options.getMember("member") || interaction.member);
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
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.EmbedLinks],
        examples: ['membre: @Utilisateur'],
        options: [{
                name: "member",
                description: "Utilisateur dont vous voulez voir les informations",
                type: 6,
            }]
    }
};
exports.default = userInfoCommand;
//# sourceMappingURL=user-info.js.map