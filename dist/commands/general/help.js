"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const helpCommand = {
    run: async ({ client, interaction }) => {
        const commandName = interaction.options.getString('commande');
        if (commandName) {
            const command = client.commands.get(commandName);
            if (!command)
                return interaction.reply({ content: `Je ne trouve aucune commande **${(0, discord_js_1.escapeMarkdown)(commandName)}**.` });
            const optionTypes = {
                1: "sous-commande",
                2: "group de sous-commandes",
                3: "Chaine de caractère",
                4: "nombre entier",
                5: "vrai ou faux",
                6: "utilisateur",
                7: "salon",
                8: "rôle",
                9: "mention",
                10: "nombre",
                11: "fichier"
            };
            interaction.reply({
                embeds: [{
                        color: client.config.color,
                        title: `Commande ${command.help.name}`,
                        fields: [
                            { name: "Description", value: command.help.description },
                            {
                                name: "Utilisation",
                                value: `\`/${command.help.name}${command.help.options?.length ? ` ${command.help.options.map(o => `${o.required ? o.name : `[${o.name}]`}: <${optionTypes[o.type] || "inconnu"}>`).join(" ")}` : ""}\``
                            },
                            {
                                name: "Exemples",
                                value: command.help.examples?.length ? command.help.examples.map(e => `\`/${command.help.name} ${e}\``).join('\n') : `\`/${command.help.name}\``
                            },
                            {
                                name: "Permissions",
                                value: `Permissions du bot : ${command.help.botPermissions?.length ? new discord_js_1.PermissionsBitField(command.help.botPermissions).toArray().map(p => `\`${p}\``).join(", ") : "Aucune"}\nPermission du membre : ${command.help.memberPermissions?.length ? new discord_js_1.PermissionsBitField(command.help.memberPermissions).toArray().map(p => `\`${p}\``).join(", ") : "Aucune"}`
                            }
                        ]
                    }]
            });
        }
        else {
            const commands = client.commands.filter(c => c.help.category !== "owner");
            const categoryNames = {
                configuration: '⚙️ Configuration',
                general: '📰 Général',
                moderation: '🛡️ Moderation'
            };
            interaction.reply({
                embeds: [{
                        color: client.config.color,
                        title: 'Commandes',
                        description: `Préfixe : \`/\`\nCommandes : \`${commands.size}\``,
                        fields: [...new Set(commands.map(c => c.help.category))].map(category => ({
                            name: categoryNames[category || ""] || category || "Autre",
                            value: commands.filter(c => c.help.category === category).map(c => `\`${c.help.name}\``).join(', ')
                        }))
                    }]
            });
        }
    },
    help: {
        description: "Affiche la liste des commandes du bot.",
        botPermissions: [discord_js_1.PermissionsBitField.Flags.EmbedLinks],
        examples: ['commande: help'],
        dmPermission: true,
        options: [{
                name: "commande",
                description: "La commande pour laquelle afficher les informations.",
                type: 3,
                autocomplete: true
            }]
    }
};
exports.default = helpCommand;
//# sourceMappingURL=help.js.map