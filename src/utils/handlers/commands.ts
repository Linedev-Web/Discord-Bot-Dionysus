import { lstatSync, readdirSync } from "node:fs";
import { ChatInputCommandInteraction } from "discord.js";
import { ExtendedClient, Command } from "../../types";
import path from "node:path";

export default async (client: ExtendedClient) => {
    const commandsPath = path.join(__dirname, "../../commands");
    const categories = readdirSync(commandsPath);
    
    for (const category of categories) {
        const categoryPath = path.join(commandsPath, category);
        const files = readdirSync(categoryPath).filter(file => lstatSync(path.join(categoryPath, file)).isFile() && (file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts'))));
        
        for (const file of files) {
            const commandName = file.split('.')[0];
            if (!commandName) continue;
            const filePath = path.join(categoryPath, file);
            const commandModule = await import(filePath);
            const command: Command = commandModule.default || commandModule;

            client.slashs.push({
                name: commandName,
                description: command.help.description,
                options: command.help.options as any,
                type: 1, // ChatInput
                defaultMemberPermissions: command.help.memberPermissions || null,
                dmPermission: command.help.dmPermission || false,
            });

            client.commands.set(commandName, {
                run: command.run, 
                help: Object.assign(command.help, { name: commandName, category })
            });
        }
    }
};
