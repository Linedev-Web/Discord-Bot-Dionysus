module.exports = {
    run: async ({client, interaction}) => {
        const focused = interaction.options.getFocused();

        interaction.respond(focused.length ? client.commands
            .filter(c => c.help.name.includes(focused)).map(c => ({name: c.help.name, value: c.help.name})) : client.commands.map(c => ({name: c.help.name, value: c.help.name})));
    }, help: {
        description: "Affiche la liste des commandes"
    }
};