const {Client} = require('discord.js')
const {readdirSync} = require("node:fs");
const config = require("./config");
require('dotenv').config();

const client = new Client({intents: config.intents})

client.config = config
client.commands = {}
client.slashs = []
client.autocompletes = {};

readdirSync('./src/utils/handlers').forEach(handler => require(`./src/utils/handlers/${handler}`)(client))


client.login(process.env.TOKEN)