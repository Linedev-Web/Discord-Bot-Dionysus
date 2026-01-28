import { PrismaClient } from '@prisma/client';
import payloads from "./payloads/index";

const prisma = new PrismaClient();

export const database = {
    createWelcome: async function ({ guildID }: { guildID: string }) {
        return await prisma.welcome.create({ data: payloads.welcome({ guildID }) });
    },

    selectWelcomeByGuildId: async function ({ guildID }: { guildID: string }) {
        return await prisma.welcome.findUnique({ where: { guildID } }) || await this.createWelcome({ guildID });
    },

    updateWelcomeSetEnabledByGuildID: async function ({ guildID, enabled }: { guildID: string, enabled: boolean }) {
        return prisma.welcome.update({ where: { guildID } , data: { enabled } });
    },

    updateWelcomeSetModuleEnabledByGuildID: async function ({ guildID, type, enabled }: { guildID: string, type: string, enabled: boolean }) {
        const data: any = {};
        data[`${type}Enabled`] = enabled;
        return prisma.welcome.update({ where: { guildID }, data });
    },

    updateWelcomeSetModuleChannelIDByGuildID: async function ({ guildID, type, channelID }: { guildID: string, type: string, channelID: string }) {
        const data: any = {};
        data[`${type}ChannelID`] = channelID;
        return prisma.welcome.update({ where: { guildID }, data });
    },

    updateWelcomeSetModuleMessageByGuildID: async function ({ guildID, type, message }: { guildID: string, type: string, message: string }) {
        const data: any = {};
        data[`${type}Message`] = message;
        return prisma.welcome.update({ where: { guildID }, data });
    },
};

export default database;
