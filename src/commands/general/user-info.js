const {PermissionsBitField} = require("discord.js");

module.exports = {
    run: async ({interaction}) => {
        const member = interaction.options.getMember("member") || interaction.member;
        interaction.reply({
            embeds: [{
                color: member.displayColor,
                author: {name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL()},
                thumbnail: {url: member.user.displayAvatarURL({size: 2048, extension: "png"})},
                fields: [{name: "Member", value: member.toString(), inline: true}, {
                    name: "ID  du member",
                    value: member.id.toString(),
                    inline: true
                }, {name: "Pseudo sur le serveur", value: member.nickname || "Aucun pseudo", inline: false}, {
                    name: "Boosts",
                    value: member.premiumSinceTimestamp ? `<t:${Math.floor(member.premiumSinceTimestamp / 1000)}:R>` : "Aucun Boosts",
                    inline: false
                }, {
                    name: "Date de création du compte",
                    value: `<t:${Math.floor(member.user.createdAt / 1000)}> (<t:${Math.floor(member.user.createdAt / 1000)}:R>)`,
                    inline: false
                }, {
                    name: "Date d'arrivée sur le serveur",
                    value: `<t:${Math.floor(member.joinedAt / 1000)}> (<t:${Math.floor(member.joinedAt / 1000)}:R>)`,
                    inline: false
                },],
                image: {url: member.user.displayAvatarURL({size: 2048, extension: "png"})}
            }]
        });
    }, help: {
        description: "Affiche les informations d'un utilisateur",
        memberPermissions: [PermissionsBitField.Flags.EmbedLinks],
        examples: ['membre: xxxxxx#0000'],
        options: [{
            name: "member",
            description: "Utilisateur auquel l'on veux voir les informations",
            type: 6,
        }]
    }
};