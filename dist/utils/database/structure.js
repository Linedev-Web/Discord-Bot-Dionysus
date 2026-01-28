"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const client_1 = require("@prisma/client");
const index_1 = __importDefault(require("./payloads/index"));
const prisma = new client_1.PrismaClient();
exports.database = {
    createWelcome: async function ({ guildID }) {
        return await prisma.welcome.create({ data: index_1.default.welcome({ guildID }) });
    },
    selectWelcomeByGuildId: async function ({ guildID }) {
        return await prisma.welcome.findUnique({ where: { guildID } }) || await this.createWelcome({ guildID });
    },
    updateWelcomeSetEnabledByGuildID: async function ({ guildID, enabled }) {
        return prisma.welcome.update({ where: { guildID }, data: { enabled } });
    },
    updateWelcomeSetModuleEnabledByGuildID: async function ({ guildID, type, enabled }) {
        const data = {};
        data[`${type}Enabled`] = enabled;
        return prisma.welcome.update({ where: { guildID }, data });
    },
    updateWelcomeSetModuleChannelIDByGuildID: async function ({ guildID, type, channelID }) {
        const data = {};
        data[`${type}ChannelID`] = channelID;
        return prisma.welcome.update({ where: { guildID }, data });
    },
    updateWelcomeSetModuleMessageByGuildID: async function ({ guildID, type, message }) {
        const data = {};
        data[`${type}Message`] = message;
        return prisma.welcome.update({ where: { guildID }, data });
    },
};
exports.default = exports.database;
//# sourceMappingURL=structure.js.map