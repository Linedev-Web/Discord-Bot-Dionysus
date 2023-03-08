const {lstatSync, readdirSync} = require("node:fs");

//Permet de chercher tout les commands dans le dossier ./src/commands/xx/xx.js
module.exports = client => {
    readdirSync('./src/commands').forEach(category => {
        readdirSync(`./src/commands/${category}`).filter(file => lstatSync(`./src/commands/${category}/${file}`).isFile() && file.endsWith('.js')).forEach(file => {
            const command = require(`../../commands/${category}/${file}`)
            const commandName = file.split('.')[0];

            client.slashs.push({
                name: commandName,
                description: command.help.description,
                type: ApplicationCommandType.chatInput,
                defaultMemberPermissions: command.help.memberPermissions || null,
                dmPermission: command.help.dmPermission || false
            })

            client.command[commandName] = {
                run: command.run,
                help: Object.assign(command.help, {name: commandName, category})
            }
        })
    })
}