const {PrismaClient} = require('@prisma/client');
const payloads = require("./payloads/index");

const prisma = new PrismaClient();

module.exports = {
    createWelcome: async function ({guildID}) {
        return await prisma.welcome.create({data: payloads.welcome({guildID}) });
    },

    selectWelcomeByGuildId: async function ({guildID}) {
        return await prisma.welcome.findUnique({where: {guildID}}) || await this.createWelcome({guildID});
    }
};