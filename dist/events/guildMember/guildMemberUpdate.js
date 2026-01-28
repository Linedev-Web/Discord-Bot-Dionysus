"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guildMemberUpdateEvent = ({ client, params: [oldMember, newMember] }) => {
    if (oldMember.pending && !newMember.pending)
        client.emit('guildMemberAdd', newMember);
};
exports.default = guildMemberUpdateEvent;
//# sourceMappingURL=guildMemberUpdate.js.map