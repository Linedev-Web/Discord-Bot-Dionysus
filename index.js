const {Client, Collection} = require('discord.js')
const {readdirSync} = require("node:fs");
const config = require("./config");
require('dotenv').config();

const client = new Client({intents: config.intents})

client.config = config
client.commands = new Collection();
client.slashs = []
client.autocompletes = new Collection();
client.modals = new Collection();
client.db = require('./src/utils/database/structure')

readdirSync('./src/utils/handlers').forEach(handler => require(`./src/utils/handlers/${handler}`)(client))


client.login(process.env.TOKEN)