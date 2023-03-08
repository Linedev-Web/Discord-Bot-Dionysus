module.exports = {
    run: ({client, interaction}) => {
        interaction.reply({content: `Mon ping est de ${client.ws.ping}ms.`})
    },
    help: {
        description: "Afficher le ping du bot"
    }
}