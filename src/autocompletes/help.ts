import { Autocomplete } from "../types";

const helpAutocomplete: Autocomplete = {
    run: async ({ client, interaction }) => {
        const focused = interaction.options.getFocused();

        const commands = client.commands
            .filter(c => c.help.name?.includes(focused))
            .map(c => ({ name: c.help.name!, value: c.help.name! }));

        interaction.respond(commands.slice(0, 25));
    }
};

export default helpAutocomplete;
