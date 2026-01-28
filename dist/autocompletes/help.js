"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpAutocomplete = {
    run: async ({ client, interaction }) => {
        const focused = interaction.options.getFocused();
        const commands = client.commands
            .filter(c => c.help.name?.includes(focused))
            .map(c => ({ name: c.help.name, value: c.help.name }));
        interaction.respond(commands.slice(0, 25));
    }
};
exports.default = helpAutocomplete;
//# sourceMappingURL=help.js.map