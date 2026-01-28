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
exports.default = (client) => {
    const modalsRootPath = node_path_1.default.join(__dirname, "../../modals");
    const handleModals = async (relativePath, filesName) => {
        const fullPath = node_path_1.default.join(modalsRootPath, relativePath);
        if ((0, node_fs_1.lstatSync)(fullPath).isDirectory()) {
            const subFiles = (0, node_fs_1.readdirSync)(fullPath);
            for (const subFile of subFiles) {
                const subFileName = subFile.split(".")[0];
                if (subFileName) {
                    await handleModals(node_path_1.default.join(relativePath, subFile), [...filesName, subFileName]);
                }
            }
        }
        else if ((relativePath.endsWith('.js') || (relativePath.endsWith('.ts') && !relativePath.endsWith('.d.ts')))) {
            const modalModule = await Promise.resolve(`${fullPath}`).then(s => __importStar(require(s)));
            const modal = modalModule.default || modalModule;
            const modalName = filesName.filter(f => f !== "index").join("-");
            client.modals.set(modalName, modal);
        }
    };
    if ((0, node_fs_1.readdirSync)(modalsRootPath).length > 0) {
        (0, node_fs_1.readdirSync)(modalsRootPath).forEach(file => {
            const fileName = file.split('.')[0];
            if (fileName) {
                handleModals(file, [fileName]);
            }
        });
    }
};
//# sourceMappingURL=modals.js.map