"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const welcomePayload = ({ guildID }) => {
    return {
        guildID,
        enabled: false,
        welcomeEnabled: false,
        welcomeMessage: "Bienvenue {user:mention} dans le serrveur {guild:name} !",
        goodbyeEnabled: false,
        goodbyeMessage: "Au revoir {user:tag} !",
    };
};
exports.default = welcomePayload;
//# sourceMappingURL=welcome.js.map