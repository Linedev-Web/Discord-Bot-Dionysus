const {PermissionsBitField} = require("discord.js");
const util = require("util");

module.exports = {
    run: async ({client, interaction}) => {

        await interaction.deferReply();
        const code = interaction.options.getString('code');

        return new Promise(res => res(eval(code)))
            .then(outpout => {
                interaction.editReply({
                    embeds: [{
                        color: 0x70db6c,
                        description: `**Entrée**\n\`\`\`js\n${code.slice(0, 1000).replace(client.token, "nop")}\n\`\`\`\n**Sortie**\n\`\`\`js\n${util.inspect(outpout, false, 0).slice(0, 1000).replace(client.token, "nop")}\n\`\`\``
                    }]
                });
            }).catch(err => {
                interaction.editReply({
                    embeds: [{
                        color: 0xff0000,
                        title: "Erreur",
                        description: `\`\`\`js\n${err.message}\n\`\`\``
                    }]
                });
            });

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