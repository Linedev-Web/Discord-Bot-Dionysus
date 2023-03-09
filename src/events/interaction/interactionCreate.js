const {PermissionsBitField} = require("discord.js");
module.exports = ({client, params: [interaction]}) => {
    console.log(interaction.guild.members.me.flags)
    if (!interaction.isCommand() || !interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel)) return;

    const command = client.commands[interaction.commandName]
    console.warn('%c================================================')
    console.table(command)
    console.table(command.help.botPermissions)
    console.warn('%c================================================')
    if (!command) return interaction.reply({content: "Cette commande n'éxiste pas ou n'éxiste plus."})

    console.log(command.help.botPermissions?.length)
    if (command.help.botPermissions?.length > 0 && !interaction.channel.permissionsFor(interaction.guild.members.me).has(command.help.botPermissions)) return interaction.reply({content: `Je n'ai pas les permissions suffisantes, veuilliez m'ajouter les permissions suivantes: ${new PermissionsBitField(command.help.botPermissions).toArray().map(perm => `\`${perm}\``).join(', ')}.`})

    command.run({client, interaction})
}