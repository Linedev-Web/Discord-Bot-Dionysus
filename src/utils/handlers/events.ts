import { lstatSync, readdirSync } from "node:fs";
import { ExtendedClient } from "../../types";
import path from "node:path";

export default async (client: ExtendedClient) => {
    const eventsPath = path.join(__dirname, "../../events");
    const categories = readdirSync(eventsPath);

    for (const category of categories) {
        const categoryPath = path.join(eventsPath, category);
        const files = readdirSync(categoryPath).filter(file =>
            lstatSync(path.join(categoryPath, file)).isFile() && (file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts'))));

        for (const file of files) {
            const eventName = file.split('.')[0] as any;

            client.on(eventName, async (...params) => {
                const filePath = path.join(categoryPath, file);
                const eventModule = await import(filePath);
                const event = eventModule.default || eventModule;
                event({ client, params });
            });
        }
    }
};
