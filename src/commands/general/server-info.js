const {PermissionsBitField} = require("discord.js");
module.exports = {
    run: ({client, interaction}) => {
        interaction.reply({
            embeds: [{
                color: client.config.color,
                author: {name: interaction.guild.name, icon_url: interaction.guild.iconURL()},
                thumbnail: {url: interaction.guild.iconURL({size: 2048, extension: 'png'})},
                fields: [
                    {name: "Propriétaire", value: `<@${interaction.guild.ownerId}>(\`${interaction.guild.ownerId}\`)`},
                    {name: "Description", value: interaction.guild.description || "Aucune description"},
                    {
                        name: "Boosts",
                        value: `${interaction.guild.premiumSubscriptionCount} Boost${interaction.guild.premiumSubscriptionCount > 1 ? '0' : ''}(\`Niveau ${interaction.guild.premiumTier}'\`)`
                    },
                    {name: "Membres", value: interaction.guild.memberCount.toString(), inline: true},
                    {name: "Rôles", value: interaction.guild.roles.cache.size.toString(), inline: true},
                    {name: "Salons", value: interaction.guild.channels.cache.size.toString(), inline: true},
                    {name: "Date de création", value: `<t:${Math.floor(interaction.guild.createdAt / 1000)}:R>`},
                ],
                image: {url: interaction.guild.bannerURL({size: 2048, extension: 'png'})}
            }]
        })
    }, help: {
        description: "Afficher les informations du serveur",
        botPermissions: [PermissionsBitField.Flags.EmbedLinks]
    }
}