import { PermissionsBitField } from "discord.js";
import { Command } from "../../types";

const serverInfoCommand: Command = {
    run: ({ client, interaction }) => {
        if (!interaction.guild) return;

        interaction.reply({
            embeds: [{
                color: client.config.color,
                author: { name: interaction.guild.name, icon_url: interaction.guild.iconURL() ?? undefined },
                thumbnail: { url: interaction.guild.iconURL({ size: 2048, extension: 'png' }) ?? undefined },
                fields: [
                    { name: "Propriétaire", value: `<@${interaction.guild.ownerId}>(\`${interaction.guild.ownerId}\`)` },
                    { name: "Description", value: interaction.guild.description || "Aucune description" },
                    {
                        name: "Boosts",
                        value: `${interaction.guild.premiumSubscriptionCount} Boost${(interaction.guild.premiumSubscriptionCount || 0) > 1 ? 's' : ''} (\`Niveau ${interaction.guild.premiumTier}\`)`
                    },
                    { name: "Membres", value: interaction.guild.memberCount.toString(), inline: true },
                    { name: "Rôles", value: interaction.guild.roles.cache.size.toString(), inline: true },
                    { name: "Salons", value: interaction.guild.channels.cache.size.toString(), inline: true },
                    { name: "Date de création", value: `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>` },
                ],
                image: { url: interaction.guild.bannerURL({ size: 2048, extension: 'png' }) ?? undefined }
            }] as any
        });
    },
    help: {
        description: "Afficher les informations du serveur",
        botPermissions: [PermissionsBitField.Flags.EmbedLinks]
    }
};

export default serverInfoCommand;
