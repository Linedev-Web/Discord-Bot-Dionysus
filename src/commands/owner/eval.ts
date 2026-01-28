import { PermissionsBitField } from "discord.js";
import util from "util";
import { Command } from "../../types";

const evalCommand: Command = {
    run: async ({ client, interaction }) => {
        await interaction.deferReply();
        const code = interaction.options.getString('code');
        if (!code) return interaction.editReply("Aucun code fourni.");

        try {
            const output = await eval(code);
            const inspectedOutput = util.inspect(output, { depth: 0 }).replace(client.token || "", "nop");
            
            interaction.editReply({
                embeds: [{
                    color: 0x70db6c,
                    description: `**Entrée**\n\`\`\`js\n${code.slice(0, 1000).replace(client.token || "", "nop")}\n\`\`\`\n**Sortie**\n\`\`\`js\n${inspectedOutput.slice(0, 1000)}\n\`\`\``
                }]
            });
        } catch (err: any) {
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
        botPermissions: [PermissionsBitField.Flags.EmbedLinks],
        memberPermissions: [PermissionsBitField.Flags.Administrator],
        options: [{
            name: "code",
            description: "Le code à exécuter.",
            type: 3,
            required: true
        }]
    }
};

export default evalCommand;
