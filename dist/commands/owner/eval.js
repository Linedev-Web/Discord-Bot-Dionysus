"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = __importDefault(require("util"));
const evalCommand = {
    run: async ({ client, interaction }) => {
        await interaction.deferReply();
        const code = interaction.options.getString('code');
        if (!code)
            return interaction.editReply("Aucun code fourni.");
        try {
            const output = await eval(code);
            const inspectedOutput = util_1.default.inspect(output, { depth: 0 }).replace(client.token || "", "nop");
            interaction.editReply({
                embeds: [{
                        color: 0x70db6c,
                        description: `**Entrée**\n\`\`\`js\n${code.slice(0, 1000).replace(client.token || "", "nop")}\n\`\`\`\n**Sortie**\n\`\`\`js\n${inspectedOutput.slice(0, 1000)}\n\`\`\``
                    }]
            });
        }
        catch (err) {
            interaction.editReply({
                embeds: [{
                        color: 0xff0000,
                        title: "Erreur",
                        description: `\`\`\`js\n${err.message}\n\`\`\``
                    }]
            });
        }
    },
    help: {
        description: "Exécuter du code JavaScript sur le bot",
        botPermissions: [discord_js_1.PermissionsBitField.Flags.EmbedLinks],
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.Administrator],
        options: [{
                name: "code",
                description: "Le code à exécuter.",
                type: 3,
                required: true
            }]
    }
};
exports.default = evalCommand;
//# sourceMappingURL=eval.js.map