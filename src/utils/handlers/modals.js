const {lstatSync, readdirSync} = require("node:fs");

module.exports = (client) => {
    const handleModals = function (path, filesName) {
        if (lstatSync(`./src/modals/${path}`).isDirectory()) {
            readdirSync(`./src/modals/${path}`).forEach(subFile => {
                handleModals(`${path}/${subFile}`, [...filesName, subFile.split(".")[0]]);
            });
        } else {
            const modal = require(`../../modals/${path}`);

            const modalName = filesName.filter(f => f !== "index").join("-");
            client.modules.set(modalName, {run: modal.run, help: Object.assign(modal.help, {name: modalName})});
        }
    };

    readdirSync("./src/modals").forEach(file => handleModals(file, [file.split('.')[0]]));
};