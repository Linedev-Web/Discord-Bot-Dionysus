import { lstatSync, readdirSync } from "node:fs";
import { ExtendedClient, Autocomplete } from "../../types";
import path from "node:path";

export default (client: ExtendedClient) => {
    const autocompletesPath = path.join(__dirname, "../../autocompletes");
    readdirSync(autocompletesPath).filter(file => lstatSync(path.join(autocompletesPath, file)).isFile() && (file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts')))).forEach(async file => {
        const filePath = path.join(autocompletesPath, file);
        const autocompleteModule = await import(filePath);
        const autocomplete: Autocomplete = autocompleteModule.default || autocompleteModule;
        const autocompleteName = file.split('.')[0];
        if (!autocompleteName) return;

        client.autocompletes.set(autocompleteName, autocomplete);
    });
};
