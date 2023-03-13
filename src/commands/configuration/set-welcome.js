const {PermissionsBitField, ActionRow, TextInputComponent} = require("discord.js");
module.exports = {
    run: async ({client, interaction}) => {
        const welcomeDB  = client.db.selectWelcomeByGuildId({guildID: interaction.guildId});
        const subCommand = interaction.options.getSubcommand();
        const state      = interaction.options.getString('état');
        const type       = interaction.options.getString('types');
        const channel    = interaction.options.getString('salon');

        const types = {
            welcome: "Bienvenue", goodbye: "Au revoir"
        };
        console.log(welcomeDB);
        console.table(welcomeDB);

        if (subCommand === "plugin-state") {
            if (welcomeDB.enabled === (state === "enabled")) return interaction.repl({
                content: `Le plugin de bienvenue est déjà ${state === "enabled" ? "activé" : "désactiver"}`,
                ephemeral: true
            });
            await client.db.updateWelcomeSetEnabledByGuildID({
                guildID: interaction.guildId, enabled: state === "enabled"
            });

            interaction.reply({
                content: `Le plugin de bienvenue à été ${state === "enabled" ? "activé" : "désactivé"}`
            });
        } else if (subCommand === "modules-state") {
            if (!welcomeDB.enabled) return interaction.reply({
                content: "Le plugin de bienvenue n'est pas activé, activez-le en tapant `/set-welcome plugin-state état: Activer` et réssayer.",
                ephemeral: true
            });
            if (welcomeDB[`${type}Enabled`] === (state === "enabled")) return interaction.reply({
                content: `le module de \`${types[type]}\` du plugin de bienvenue est déjà ${state === "enabled" ? "activé" : "désactiver"}.`,
                ephemeral: true
            });

            await client.db.updateWelcomeSetModuleEnableByGuildID({
                guildID: interaction.guildId, type, enabled: state === 'enabled'
            });

            interaction.reply({
                content: `le module de \`${types[type]}\` du plugin de bienvenue à bien été ${state === "enabled" ? "activé" : "désactiver"}.`
            });
        } else if (subCommand === "salon") {
            if (!welcomeDB.enabled) return interaction.reply({
                content: "Le plugin de bienvenue n'est pas activé, activez-le en tapant `/set-welcome plugin-state état: Activer` et réssayer.",
                ephemeral: true
            });

            if (!welcomeDB[`${type}Enabled`]) return interaction.reply({
                content: `Le module de \`${types[type]}\` du plugin de bienvenue n'est pas activé, activez-le en tapant \`/set-welcome modules-state état Activer: ${types[type]}\` est réessayez.`,
                ephemeral: true
            });

            if (!channel) return interaction.reply({content: " Le salon n'éxiste pas.", ephemeral: true});
            if (welcomeDB[`${type}ChannelID`] === channel.id) return interaction.reply({
                content: `Ce salon est le même que l'actuel du module de \`${types[type]}\` du plugin de bienvenue`,
                ephemeral: true
            });
            if (!channel.permissionsFor(interaction.guild.members.me).has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles])) return interaction.reply({
                content: "Je n'ai pas assez de permission dans ce salon, assurez-vous que j'ai les permission `Voir le salon`, `Envoyer des messages` et `Attacher des fichiers` dans celui-ci",
                ephemeral: true
            });

            await client.db.updateWelcomeSetModuleChannelIDByGuildID({
                guildID: interaction.guildId, type, channelID: channel.id
            });

            interaction.reply({content: `Le salon du module de \`${types[type]}\` du plugin de bienvenue à bien été défini sur ${channel}.`});
        } else if (subCommand === 'message') {
            if (!welcomeDB.enabled) return interaction.reply({
                content: "Le plugin de bienvenue n'est pas activé, activez-le en tapant `/set-welcome plugin-state état: Activer` et réssayer.",
                ephemeral: true
            });

            if (!welcomeDB[`${type}Enabled`]) return interaction.reply({
                content: `Le module de \`${types[type]}\` du plugin de bienvenue n'est pas activé, activez-le en tapant \`/set-welcome modules-state état Activer: ${types[type]}\` est réessayez.`,
                ephemeral: true
            });

            await interaction.showModal({
                custom_id: `config-welcome-message:${type}`, title: "Message", components: [{
                    type: ActionRow, components: [{
                        type: TextInputComponent,
                        custom_id: "message",
                        label: "le message à configurer",
                        placeholder: "Saississez un message",
                        value: welcomeDB[`${type}Message`],
                        style: 2,
                        max_length: 1024,
                        required: true
                    }]
                }]
            });
        } else {
            interaction.reply({content: `Aucune sous-commande trouvé pour \`${subCommand}.`, ephemeral: true});
        }

    }, help: {
        description: "Configure le plugin de bienvenue.",
        memberPermissions: [PermissionsBitField.Flags.Administrator],
        options: [{
            name: "plugin-state",
            description: "Active/désactive le plugin de bienvenue",
            type: 1,
            options: [{
                name: "état",
                description: "Etat du plugin",
                type: 3,
                choices: [{name: "Activer", value: "enabled"}, {name: "Désactiver", value: "disabled"}],
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
                choices: [{name: "Activer", value: "enabled"}, {name: "Désactiver", value: "disabled"}],
                required: true
            }, {
                name: "type",
                description: "Le module auquel changer l'état.",
                type: 3,
                choices: [{name: "Bienvenue", value: "welcome"}, {name: "Au revoir", value: "goodbye"}],
                required: true
            }]
        }, {
            name: "salon",
            description: "Definit le salon dans lequelle sera envoyer le message.",
            type: 1,
            options: [{
                name: "salon", description: "Le salon à définir.", type: 7, channelTypes: [0], required: true
            }, {
                name: "type",
                description: "Le module auquel définir le salon.",
                type: 3,
                choices: [{name: "Bienvenue", value: "welcome"}, {name: "Au revoir", value: "goodbye"}],
                required: true
            }]
        }, {
            name: 'message',
            description: "Définit le message qui sera envoyer dans le salon",
            type: 1,
            choices: [{name: "Bienvenue", value: "welcome"}, {name: "Au revoir", value: "goodbye"}]
        }]
    }
};