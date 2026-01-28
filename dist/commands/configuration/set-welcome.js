"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const setWelcomeCommand = {
    run: async ({ client, interaction }) => {
        if (!interaction.guildId)
            return;
        const welcomeDB = await client.db.selectWelcomeByGuildId({ guildID: interaction.guildId });
        const subCommand = interaction.options.getSubcommand();
        const state = interaction.options.getString('état');
        const type = interaction.options.getString('type');
        const channel = interaction.options.getChannel('salon');
        const types = {
            welcome: "Bienvenue",
            goodbye: "Au revoir"
        };
        if (subCommand === "plugin-state") {
            if (welcomeDB.enabled === (state === "enabled")) {
                return interaction.reply({
                    content: `Le plugin de bienvenue est déjà ${state === "enabled" ? "activé" : "désactivé"}`,
                    ephemeral: true
                });
            }
            await client.db.updateWelcomeSetEnabledByGuildID({
                guildID: interaction.guildId,
                enabled: state === "enabled"
            });
            interaction.reply({
                content: `Le plugin de bienvenue a été ${state === "enabled" ? "activé" : "désactivé"}`
            });
        }
        else if (subCommand === "modules-state") {
            if (!type)
                return;
            if (welcomeDB.enabled === false) {
                return interaction.reply({
                    content: "Le plugin de bienvenue n'est pas activé, activez-le en tapant `/set-welcome plugin-state état: Activer` et réessayez.",
                    ephemeral: true
                });
            }
            if (welcomeDB[`${type}Enabled`] === (state === "enabled")) {
                return interaction.reply({
                    content: `le module de \`${types[type]}\` du plugin de bienvenue est déjà ${state === "enabled" ? "activé" : "désactivé"}.`,
                    ephemeral: true
                });
            }
            await client.db.updateWelcomeSetModuleEnabledByGuildID({
                guildID: interaction.guildId,
                type,
                enabled: state === 'enabled'
            });
            interaction.reply({
                content: `le module de \`${types[type]}\` du plugin de bienvenue a bien été ${state === "enabled" ? "activé" : "désactivé"}.`
            });
        }
        else if (subCommand === "salon") {
            if (!type)
                return;
            if (welcomeDB.enabled === false) {
                return interaction.reply({
                    content: "Le plugin de bienvenue n'est pas activé, activez-le en tapant `/set-welcome plugin-state état: Activer` et réessayez.",
                    ephemeral: true
                });
            }
            if (welcomeDB[`${type}Enabled`] === false) {
                return interaction.reply({
                    content: `Le module de \`${types[type]}\` du plugin de bienvenue n'est pas activé, activez-le en tapant \`/set-welcome modules-state état Activer: ${types[type]}\` est réessayez.`,
                    ephemeral: true
                });
            }
            if (!channel)
                return interaction.reply({ content: "Le salon n'existe pas.", ephemeral: true });
            if (welcomeDB[`${type}ChannelID`] === channel.id) {
                return interaction.reply({
                    content: `Ce salon est le même que l'actuel du module de \`${types[type]}\` du plugin de bienvenue`,
                    ephemeral: true
                });
            }
            if (channel.type !== discord_js_1.ChannelType.GuildText) {
                return interaction.reply({ content: "Veuillez sélectionner un salon textuel.", ephemeral: true });
            }
            const me = interaction.guild?.members.me;
            if (me && 'isTextBased' in channel && channel.isTextBased() && 'permissionsFor' in channel) {
                if (!channel.permissionsFor(me)?.has([discord_js_1.PermissionsBitField.Flags.ViewChannel, discord_js_1.PermissionsBitField.Flags.SendMessages, discord_js_1.PermissionsBitField.Flags.AttachFiles])) {
                    return interaction.reply({
                        content: "Je n'ai pas assez de permission dans ce salon, assurez-vous que j'ai les permission `Voir le salon`, `Envoyer des messages` et `Attacher des fichiers` dans celui-ci",
                        ephemeral: true
                    });
                }
            }
            await client.db.updateWelcomeSetModuleChannelIDByGuildID({
                guildID: interaction.guildId,
                type,
                channelID: channel.id
            });
            interaction.reply({ content: `Le salon du module de \`${types[type]}\` du plugin de bienvenue a bien été défini sur ${channel}.` });
        }
        else if (subCommand === 'message') {
            if (!type)
                return;
            if (welcomeDB.enabled === false) {
                return interaction.reply({
                    content: "Le plugin de bienvenue n'est pas activé, activez-le en tapant `/set-welcome plugin-state état: Activer` et réessayez.",
                    ephemeral: true
                });
            }
            if (welcomeDB[`${type}Enabled`] === false) {
                return interaction.reply({
                    content: `Le module de \`${types[type]}\` du plugin de bienvenue n'est pas activé, activez-le en tapant \`/set-welcome modules-state état Activer: ${types[type]}\` est réessayez.`,
                    ephemeral: true
                });
            }
            await interaction.showModal({
                customId: `config-welcome-message:${type}`,
                title: "Message",
                components: [{
                        type: discord_js_1.ComponentType.ActionRow,
                        components: [{
                                type: discord_js_1.ComponentType.TextInput,
                                customId: "message",
                                label: "le message à configurer",
                                placeholder: "Saisissez un message",
                                value: welcomeDB[`${type}Message`],
                                style: discord_js_1.TextInputStyle.Paragraph,
                                maxLength: 1024,
                                required: true
                            }]
                    }]
            });
        }
        else {
            interaction.reply({ content: `Aucune sous-commande trouvée pour \`${subCommand}\`.`, ephemeral: true });
        }
    },
    help: {
        description: "Configure le plugin de bienvenue.",
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.Administrator],
        options: [{
                name: "plugin-state",
                description: "Active/désactive le plugin de bienvenue",
                type: 1,
                options: [{
                        name: "état",
                        description: "Etat du plugin",
                        type: 3,
                        choices: [{ name: "Activer", value: "enabled" }, { name: "Désactiver", value: "disabled" }],
                        required: true
                    }]
            }, {
                name: "modules-state",
                description: "Active/désactive le plugin de bienvenue",
                type: 1,
                options: [{
                        name: "état",
                        description: "Etat du module",
                        type: 3,
                        choices: [{ name: "Activer", value: "enabled" }, { name: "Désactiver", value: "disabled" }],
                        required: true
                    }, {
                        name: "type",
                        description: "Le module auquel changer l'état.",
                        type: 3,
                        choices: [{ name: "Bienvenue", value: "welcome" }, { name: "Au revoir", value: "goodbye" }],
                        required: true
                    }]
            }, {
                name: "salon",
                description: "Définit le salon dans lequel sera envoyé le message.",
                type: 1,
                options: [{
                        name: "salon",
                        description: "Le salon à définir.",
                        type: 7,
                        channelTypes: [0],
                        required: true
                    }, {
                        name: "type",
                        description: "Le module auquel définir le salon.",
                        type: 3,
                        choices: [{ name: "Bienvenue", value: "welcome" }, { name: "Au revoir", value: "goodbye" }],
                        required: true
                    }]
            }, {
                name: 'message',
                description: "Définit le message qui sera envoyé dans le salon",
                type: 1,
                options: [{
                        name: "type",
                        description: "Le module auquel définir le salon.",
                        type: 3,
                        choices: [{ name: "Bienvenue", value: "welcome" }, { name: "Au revoir", value: "goodbye" }],
                        required: true
                    }]
            }]
    }
};
exports.default = setWelcomeCommand;
//# sourceMappingURL=set-welcome.js.map