const {lstatSync, readdirSync} = require("node:fs");


module.exports = client => {
    readdirSync("./src/autocompletes").filter(file => lstatSync(`./src/autocompletes/${file}`).isFile() && file.endsWith('.js')).forEach(file => {
        const autocomplete = require(`../../autocompletes/${file}`);
        const autocompleteName = file.split('.')[0];

        client.autocompletes[autocompleteName] = {
            run: autocomplete.run,
            help: Object.assign(autocomplete.help, {name: autocompleteName})
        };
    });
};