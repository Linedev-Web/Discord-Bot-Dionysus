import { PermissionsBitField } from "discord.js";
import { Command } from "../../types";

const pingCommand: Command = {
    run: ({ client, interaction }) => {
        interaction.reply({ content: `Mon ping est de ${client.ws.ping}ms.` });
    },
    help: {
        description: "Afficher le ping du bot",
        memberPermissions: [PermissionsBitField.Flags.Administrator]
    }
};

export default pingCommand;
