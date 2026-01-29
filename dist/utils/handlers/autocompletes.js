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
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
exports.default = async (client) => {
    const autocompletesPath = node_path_1.default.join(__dirname, "../../autocompletes");
    const files = (0, node_fs_1.readdirSync)(autocompletesPath).filter(file => (0, node_fs_1.lstatSync)(node_path_1.default.join(autocompletesPath, file)).isFile() && (file.endsWith('.js') || (file.endsWith('.ts') && !file.endsWith('.d.ts'))));
    for (const file of files) {
        const filePath = node_path_1.default.join(autocompletesPath, file);
        const autocompleteModule = await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
        const autocomplete = autocompleteModule.default || autocompleteModule;
        const autocompleteName = file.split('.')[0];
        if (!autocompleteName)
            continue;
        client.autocompletes.set(autocompleteName, autocomplete);
    }
};
//# sourceMappingURL=autocompletes.js.map