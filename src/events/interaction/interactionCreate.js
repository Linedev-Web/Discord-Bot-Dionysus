module.exports = ({client, params: [interaction]}) => {
    const command = client.commands[interaction.commandName]
    if (!command) return interaction.reply({content: "Cette commande n'éxiste pas ou n'éxiste plus."})

    command.run({client, interaction})
}