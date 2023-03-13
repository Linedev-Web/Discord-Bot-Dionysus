const {PrismaClient} = require('@prisma/client');
const payloads       = require("./payloads/index");

const prisma = new PrismaClient();

module.exports = {
    createWelcome: async function ({guildID}) {
        return await prisma.welcome.create({data: payloads.welcome({guildID})});
    },

    selectWelcomeByGuildId: async function ({guildID}) {
        return await prisma.welcome.findUnique({where: {guildID}}) || await this.createWelcome({guildID});
    },

    updateWelcomeSetEnabledByGuildID: async function ({guildID, enabled}) {
        return prisma.welcome.update({where: {guildID}, data: {enabled}});
    },

    updateWelcomeSetModuleEnableByGuildID: async function ({guildID, type, enabled}) {
        const data             = {};
        data[`${type}Enabled`] = enabled;
        return prisma.welcome.update({where: {guildID}, data});

    },

    updateWelcomeSetModuleChannelIDByGuildID: async function ({guildID, type, channelID}) {
        const data             = {};
        data[`${type}ChannelID`] = channelID;
        return prisma.welcome.update({where: {guildID}, data});

    },

    updateWelcomeSetModuleMessageByGuildID: async function ({guildID, type, message}) {
        const data             = {};
        data[`${type}Message`] = message;
        return prisma.welcome.update({where: {guildID}, data});

    },

};