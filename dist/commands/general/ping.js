"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const pingCommand = {
    run: ({ client, interaction }) => {
        interaction.reply({ content: `Mon ping est de ${client.ws.ping}ms.` });
    },
    help: {
        description: "Afficher le ping du bot",
        memberPermissions: [discord_js_1.PermissionsBitField.Flags.Administrator]
    }
};
exports.default = pingCommand;
//# sourceMappingURL=ping.js.map