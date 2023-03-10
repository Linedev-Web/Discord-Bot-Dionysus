const {lstatSync, readdirSync} = require("node:fs");

//Permet de chercher tout les events dans le dossier ./src/events/xx/xx.js
module.exports = client => {
    readdirSync("./src/events").forEach(category => {
        readdirSync(`./src/events/${category}`).filter(file =>
            lstatSync(`./src/events/${category}/${file}`).isFile() && file.endsWith('.js')).forEach(file => {
            const eventName = file.split('.')[0]

            client.on(eventName, (...params) => {
                require(`../../events/${category}/${file}`)({client, params});
            })
        })
    })
}