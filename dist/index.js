"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
const structure_1 = __importDefault(require("./utils/database/structure"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: config_1.default.intents
});
client.config = config_1.default;
client.commands = new discord_js_1.Collection();
client.slashs = [];
client.autocompletes = new discord_js_1.Collection();
client.modals = new discord_js_1.Collection();
client.db = structure_1.default;
const handlersPath = node_path_1.default.join(__dirname, "utils", "handlers");
(0, node_fs_1.readdirSync)(handlersPath).forEach(async (handlerFile) => {
    if (handlerFile.endsWith('.js') || (handlerFile.endsWith('.ts') && !handlerFile.endsWith('.d.ts'))) {
        const handlerPath = node_path_1.default.join(handlersPath, handlerFile);
        const handler = await Promise.resolve(`${handlerPath}`).then(s => __importStar(require(s)));
        (handler.default || handler)(client);
    }
});
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map