"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const themesCommand = {
    run: async ({ client, interaction }) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Thèmes d'intérêt")
            .setDescription("Quels sujets t'intéressent ? (Tu peux en choisir plusieurs pour afficher/masquer les salons)")
            .setColor(client.config.color || 0x5865F2);
        const select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId('onboarding_themes')
            .setPlaceholder('Sélectionne tes thèmes...')
            .setMinValues(0)
            .setMaxValues(3)
            .addOptions(new discord_js_1.StringSelectMenuOptionBuilder().setLabel('Thème Rainbow').setValue('rainbow').setDescription('Accéder au contenu Rainbow'), new discord_js_1.StringSelectMenuOptionBuilder().setLabel('Thème ZodPress').setValue('zodpress').setDescription('Accéder au contenu ZodPress'), new discord_js_1.StringSelectMenuOptionBuilder().setLabel('Discuter').setValue('discussion').setDescription('Accéder aux salons de discussion'));
        const row = new discord_js_1.ActionRowBuilder().addComponents(select);
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
    help: {
        description: "Modifier vos thèmes d'affichage",
        botPermissions: [discord_js_1.PermissionsBitField.Flags.SendMessages],
        memberPermissions: [],
        options: [],
    }
};
exports.default = themesCommand;
//# sourceMappingURL=themes.js.map