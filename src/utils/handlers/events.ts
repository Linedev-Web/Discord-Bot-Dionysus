import { lstatSync, readdirSync } from "node:fs";
import { ExtendedClient } from "../../types";
import path from "node:path";

export default (client: ExtendedClient) => {
    const eventsPath = path.join(__dirname, "../../events");
    readdirSync(eventsPath).forEach(category => {
        const categoryPath = path.join(eventsPath, category);
        readdirSync(categoryPath).filter(file =>
            lstatSync(path.join(categoryPath, file)).isFile() && (file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts')))).forEach(file => {
            const eventName = file.split('.')[0] as any;

            client.on(eventName, async (...params) => {
                const filePath = path.join(categoryPath, file);
                const eventModule = await import(filePath);
                const event = eventModule.default || eventModule;
                event({ client, params });
            });
        });
    });
};
