module.exports = {
    run: async ({client, interaction, params}) => {
        const message = interaction.fields.getTextInputValue("message");
        const type    = params[1];

        const types = {
            welcome: "Bienvenue", goodbye: "Au revoir"
        };
        await client.db.updateWelcomeSetModuleMessageByGuildID({guildID: interaction.guildId, type, message});

        interaction.reply({content: `Le message du module de \`${types[type]}\` a été modifié.`});
    }, help: {}
};