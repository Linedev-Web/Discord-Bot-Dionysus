const {PermissionsBitField} = require("discord.js");
module.exports              = ({client, params: [interaction]}) => {

    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel)) return;

    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        console.warn('%c================================================');
        console.table(command);
        console.warn('%c================================================');

        if (!command) return interaction.reply({content: "Cette commande n'éxiste pas ou n'éxiste plus."});

        if (command.help.botPermissions?.length > 0 && !interaction.channel.permissionsFor(interaction.guild.members.me).has(command.help.botPermissions)) return interaction.reply({content: `Je n'ai pas les permissions suffisantes, veuilliez m'ajouter les permissions suivantes: ${new PermissionsBitField(command.help.botPermissions).toArray().map(perm => `\`${perm}\``).join(', ')}.`});

        command.run({client, interaction});
    } else if (interaction.isAutocomplete()) {
        const autocomplete = client.autocompletes.get(interaction.commandName);

        if (!autocomplete) return;

        autocomplete.run({client, interaction});
    } else if (interaction.isModalSubmit()) {
        const params = interaction.customId.split(':');
        const modal  = client.modals.get(params[0]);
        if (!modal) return interaction.reply({content: "Cette modale n'éxiste pas ou n'éxiste plus."});

        modal.run({client, interaction, params});
    }
};