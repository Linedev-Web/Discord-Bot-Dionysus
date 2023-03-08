const {Client} = require('discord.js')
const config = require("./config");
require('dotenv').config();

const client = new Client({intents: config.intents})

client.on('ready', () => {
    client.user.setActivity('J\'aime le vins.')
    console.log(`[${client.user.tag}]: je suis connecté.`)
})

client.login(process.env.TOKEN)