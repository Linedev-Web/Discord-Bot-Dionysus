"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOnboardingInteraction = exports.startOnboarding = void 0;
const discord_js_1 = require("discord.js");
const startOnboarding = async (client, member) => {
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`Bienvenue sur ${member.guild.name} !`)
        .setDescription("Pour commencer, d'où proviens-tu ?")
        .setColor(client.config.color || 0x5865F2);
    const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('onboarding_source:site')
        .setLabel('Depuis le Site')
        .setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
        .setCustomId('onboarding_source:socials')
        .setLabel('Depuis les Réseaux')
        .setStyle(discord_js_1.ButtonStyle.Secondary));
    try {
        await member.send({ embeds: [embed], components: [row] });
    }
    catch (e) {
        console.log(`Impossible d'envoyer un DM à ${member.user.tag}`);
        // Optionnel : Envoyer dans un salon d'accueil public si les DMs sont fermés
    }
};
exports.startOnboarding = startOnboarding;
const handleOnboardingInteraction = async (client, interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu())
        return;
    const [action, value] = interaction.customId.split(':');
    const member = interaction.member;
    if (action === 'onboarding_source') {
        const roleId = value === 'site' ? process.env.ROLE_SOURCE_SITE : process.env.ROLE_SOURCE_SOCIALS;
        if (roleId)
            await member.roles.add(roleId).catch(console.error);
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Thèmes d'intérêt")
            .setDescription("Quels sujets t'intéressent ? (Tu peux en choisir plusieurs)")
            .setColor(client.config.color || 0x5865F2);
        const select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId('onboarding_themes')
            .setPlaceholder('Sélectionne tes thèmes...')
            .setMinValues(0)
            .setMaxValues(3)
            .addOptions(new discord_js_1.StringSelectMenuOptionBuilder().setLabel('Thème Rainbow').setValue('rainbow').setDescription('Accéder au contenu Rainbow'), new discord_js_1.StringSelectMenuOptionBuilder().setLabel('Thème ZodPress').setValue('zodpress').setDescription('Accéder au contenu ZodPress'), new discord_js_1.StringSelectMenuOptionBuilder().setLabel('Discuter').setValue('discussion').setDescription('Accéder aux salons de discussion'));
        const row = new discord_js_1.ActionRowBuilder().addComponents(select);
        const nextButton = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder().setCustomId('onboarding_confirm_themes').setLabel('Continuer').setStyle(discord_js_1.ButtonStyle.Success));
        await interaction.update({ embeds: [embed], components: [row, nextButton] });
    }
    if (action === 'onboarding_themes' && interaction.isStringSelectMenu()) {
        // On stocke temporairement ou on applique direct ? L'utilisateur veut pouvoir changer.
        // Appliquons direct les rôles correspondants.
        const rolesMap = {
            'rainbow': process.env.ROLE_THEME_RAINBOW,
            'zodpress': process.env.ROLE_THEME_ZODPRESS,
            'discussion': process.env.ROLE_THEME_DISCUSSION
        };
        // Retirer les anciens rôles de thèmes d'abord pour éviter les conflits si l'utilisateur change
        const allThemeRoles = Object.values(rolesMap).filter(id => id);
        await member.roles.remove(allThemeRoles).catch(console.error);
        const selectedRoles = interaction.values.map(v => rolesMap[v]).filter(id => id);
        if (selectedRoles.length > 0)
            await member.roles.add(selectedRoles).catch(console.error);
        await interaction.deferUpdate();
    }
    if (action === 'onboarding_confirm_themes') {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Règles du serveur")
            .setDescription("Dernière étape ! Merci de confirmer que tu acceptes les règles :\n\n- Pas de spam\n- Parler correctement\n- Respecter les autres")
            .setColor(client.config.color || 0x5865F2);
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('onboarding_rules_accept')
            .setLabel('J\'accepte les règles')
            .setStyle(discord_js_1.ButtonStyle.Success));
        await interaction.update({ embeds: [embed], components: [row] });
    }
    if (action === 'onboarding_rules_accept') {
        const roleMember = process.env.ROLE_MEMBER;
        if (roleMember)
            await member.roles.add(roleMember).catch(console.error);
        await interaction.update({
            content: "C'est fini ! Bienvenue parmi nous. Tu as maintenant accès au serveur.",
            embeds: [],
            components: []
        });
    }
};
exports.handleOnboardingInteraction = handleOnboardingInteraction;
//# sourceMappingURL=onboardingLogic.js.map