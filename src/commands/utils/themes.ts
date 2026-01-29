import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionsBitField } from "discord.js";
import { Command } from "../../types";

const themesCommand: Command = {
    run: async ({ client, interaction }) => {
        const embed = new EmbedBuilder()
            .setTitle("Thèmes d'intérêt")
            .setDescription("Quels sujets t'intéressent ? (Tu peux en choisir plusieurs pour afficher/masquer les salons)")
            .setColor(client.config.color || 0x5865F2);

        const select = new StringSelectMenuBuilder()
            .setCustomId('onboarding_themes')
            .setPlaceholder('Sélectionne tes thèmes...')
            .setMinValues(0)
            .setMaxValues(3)
            .addOptions(
                new StringSelectMenuOptionBuilder().setLabel('Thème Rainbow').setValue('rainbow').setDescription('Accéder au contenu Rainbow'),
                new StringSelectMenuOptionBuilder().setLabel('Thème ZodPress').setValue('zodpress').setDescription('Accéder au contenu ZodPress'),
                new StringSelectMenuOptionBuilder().setLabel('Discuter & Tips').setValue('discussion').setDescription('Accéder aux salons de discussion et conseils dev')
            );

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

        if (interaction.options.getSubcommand() === "setup") {
            const channel = interaction.options.getChannel("salon");
            if (!channel || !('send' in channel)) return interaction.reply({ content: "Salon invalide.", ephemeral: true });
            
            await (channel as any).send({ embeds: [embed], components: [row] });
            return interaction.reply({ content: `Le menu des thèmes a été envoyé dans ${channel}.`, ephemeral: true });
        }

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
    help: {
        description: "Gérer les thèmes d'affichage",
        botPermissions: [PermissionsBitField.Flags.SendMessages],
        memberPermissions: [],
        options: [
            {
                name: "user",
                description: "Modifier vos propres thèmes (en MP)",
                type: 1
            },
            {
                name: "setup",
                description: "Installer le menu des thèmes dans un salon (Admin)",
                type: 1,
                options: [
                    {
                        name: "salon",
                        description: "Le salon où envoyer le menu",
                        type: 7,
                        channel_types: [0],
                        required: true
                    }
                ]
            }
        ],
    }
};

export default themesCommand;
