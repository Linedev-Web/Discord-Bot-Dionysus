import { 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder, 
    GuildMember, 
    StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder,
    Interaction,
    Message
} from "discord.js";
import { ExtendedClient } from "../../types";

export const startOnboarding = async (client: ExtendedClient, member: GuildMember) => {
    const embed = new EmbedBuilder()
        .setTitle(`Bienvenue sur ${member.guild.name} !`)
        .setDescription(`Ravi de te voir parmi nous, ${member} ! 👋\n\nN'hésite pas à découvrir ce que propose notre serveur. Nous avons différents salons selon tes centres d'intérêt :\n\n🎨 **Thèmes Rainbow & ZodPress**\n💬 **Espaces de discussion**\n💡 **Tips sur le développement**`)
        .setColor(client.config.color || 0x5865F2);

    const select = new StringSelectMenuBuilder()
        .setCustomId('onboarding_themes')
        .setPlaceholder('Sélectionne tes centres d\'intérêt...')
        .setMinValues(0)
        .setMaxValues(3)
        .addOptions(
            new StringSelectMenuOptionBuilder().setLabel('Thème Rainbow').setValue('rainbow').setDescription('Accéder au contenu Rainbow'),
            new StringSelectMenuOptionBuilder().setLabel('Thème ZodPress').setValue('zodpress').setDescription('Accéder au contenu ZodPress'),
            new StringSelectMenuOptionBuilder().setLabel('Discuter & Tips').setValue('discussion').setDescription('Accéder aux salons de discussion et conseils dev')
        );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
    const nextButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId('onboarding_confirm_themes').setLabel('Continuer').setStyle(ButtonStyle.Success)
    );

    try {
        await member.send({ embeds: [embed], components: [row, nextButton] });
    } catch (e) {
        console.log(`Impossible d'envoyer un DM à ${member.user.tag}`);
        
        // Tentative d'envoi dans le salon de bienvenue si possible
        const welcomeDB = await client.db.selectWelcomeByGuildId({ guildID: member.guild.id });
        if (welcomeDB.enabled && welcomeDB.welcomeEnabled && welcomeDB.welcomeChannelID) {
            const welcomeChannel = await member.guild.channels.fetch(welcomeDB.welcomeChannelID).catch(() => null);
            if (welcomeChannel && 'send' in welcomeChannel) {
                const publicRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`onboarding_start_public:${member.id}`)
                        .setLabel('Commencer l\'accueil personnalisé')
                        .setStyle(ButtonStyle.Primary)
                );
                await (welcomeChannel as any).send({ 
                    content: `Bienvenue ${member} ! Tes MPs sont fermés, clique ici pour configurer ton accès aux salons :`, 
                    components: [publicRow] 
                });
            }
        }
    }
};

export const handleOnboardingInteraction = async (client: ExtendedClient, interaction: Interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

    const [action, value] = interaction.customId.split(':');
    const member = interaction.member as GuildMember;

    if (action === 'onboarding_start_public') {
        if (interaction.user.id !== value) {
            return interaction.reply({ content: "Ce bouton ne vous est pas destiné.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle(`Bienvenue sur ${interaction.guild?.name} !`)
            .setDescription(`Ravi de te voir parmi nous ! 👋\n\nN'hésite pas à découvrir ce que propose notre serveur. Nous avons différents salons selon tes centres d'intérêt :\n\n🎨 **Thèmes Rainbow & ZodPress**\n💬 **Espaces de discussion**\n💡 **Tips sur le développement**\n\nChoisis ce qui t'intéresse ci-dessous pour personnaliser ton accès aux salons :`)
            .setColor(client.config.color || 0x5865F2);

        const select = new StringSelectMenuBuilder()
            .setCustomId('onboarding_themes')
            .setPlaceholder('Sélectionne tes centres d\'intérêt...')
            .setMinValues(0)
            .setMaxValues(3)
            .addOptions(
                new StringSelectMenuOptionBuilder().setLabel('Thème Rainbow').setValue('rainbow').setDescription('Accéder au contenu Rainbow'),
                new StringSelectMenuOptionBuilder().setLabel('Thème ZodPress').setValue('zodpress').setDescription('Accéder au contenu ZodPress'),
                new StringSelectMenuOptionBuilder().setLabel('Discuter & Tips').setValue('discussion').setDescription('Accéder aux salons de discussion et conseils dev')
            );

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
        const nextButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId('onboarding_confirm_themes').setLabel('Continuer').setStyle(ButtonStyle.Success)
        );

        // return interaction.reply({ embeds: [embed], components: [row, nextButton], ephemeral: true });
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (action === 'onboarding_themes' && interaction.isStringSelectMenu()) {
        const rolesMap: { [key: string]: string | undefined } = {
            'rainbow': process.env.ROLE_THEME_RAINBOW,
            'zodpress': process.env.ROLE_THEME_ZODPRESS,
            'discussion': process.env.ROLE_THEME_DISCUSSION
        };

        const allThemeRoles = Object.values(rolesMap).filter(id => id) as string[];
        await member.roles.remove(allThemeRoles).catch(console.error);

        const selectedRoles = interaction.values.map(v => rolesMap[v]).filter(id => id) as string[];
        if (selectedRoles.length > 0) await member.roles.add(selectedRoles).catch(console.error);
        
        if (interaction.message.flags.has('Ephemeral')) {
            await interaction.deferUpdate();
        } else {
            await interaction.reply({ content: "Tes préférences ont été mises à jour !", ephemeral: true });
        }
    }

    if (action === 'onboarding_confirm_themes') {
        const embed = new EmbedBuilder()
            .setTitle("Règles du serveur")
            .setDescription("Dernière étape ! Merci de confirmer que tu acceptes les règles du serveur pour finaliser ton arrivée :\n\n- Pas de spam\n- Parler correctement\n- Respecter les autres membres\n- Pas de publicité non autorisée")
            .setColor(client.config.color || 0x5865F2);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('onboarding_rules_accept')
                .setLabel('J\'accepte les règles')
                .setStyle(ButtonStyle.Success)
        );

        await interaction.update({ embeds: [embed], components: [row] });
    }

    if (action === 'onboarding_rules_accept') {
        const roleMember = process.env.ROLE_MEMBER;
        if (roleMember) await member.roles.add(roleMember).catch(console.error);

        const responseContent = "C'est fini ! Bienvenue parmi nous. Tu as maintenant accès au serveur.";
        
        if (interaction.message.flags.has('Ephemeral')) {
            await interaction.update({ 
                content: responseContent, 
                embeds: [], 
                components: [] 
            });
        } else {
            // Pour les DMs non-éphémères (ou si jamais c'est appelé d'ailleurs)
            await interaction.update({ 
                content: responseContent, 
                embeds: [], 
                components: [] 
            });
        }
    }
};
