import { lstatSync, readdirSync } from "node:fs";
import { ChatInputCommandInteraction } from "discord.js";
import { ExtendedClient, Command } from "../../types";
import path from "node:path";

export default (client: ExtendedClient) => {
    const commandsPath = path.join(__dirname, "../../commands");
    readdirSync(commandsPath).forEach(category => {
        const categoryPath = path.join(commandsPath, category);
        readdirSync(categoryPath).filter(file => lstatSync(path.join(categoryPath, file)).isFile() && (file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts')))).forEach(async file => {
            const commandName = file.split('.')[0];
            if (!commandName) return;
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
        });
    });
};
