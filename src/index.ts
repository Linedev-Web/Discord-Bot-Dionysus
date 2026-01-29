import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from "node:fs";
import path from "node:path";
import dotenv from 'dotenv';
import config from "./config";
import { ExtendedClient } from "./types";
import database from './utils/database/structure';

dotenv.config();

const client = new Client({ 
    intents: config.intents 
}) as ExtendedClient;

client.config = config;
client.commands = new Collection();
client.slashs = [];
client.autocompletes = new Collection();
client.modals = new Collection();
client.db = database;

const handlersPath = path.join(__dirname, "utils", "handlers");
const handlers = readdirSync(handlersPath).filter(f => f.endsWith('.js') || (f.endsWith('.ts') && !f.endsWith('.d.ts')));

async function loadHandlers() {
    for (const handlerFile of handlers) {
        const handlerPath = path.join(handlersPath, handlerFile);
        const handler = await import(handlerPath);
        await (handler.default || handler)(client);
    }
    client.login(process.env.TOKEN);
}

loadHandlers();
