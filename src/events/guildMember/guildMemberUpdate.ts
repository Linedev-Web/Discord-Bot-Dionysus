import { GuildMember } from "discord.js";
import { ExtendedClient } from "../../types";

const guildMemberUpdateEvent = ({ client, params: [oldMember, newMember] }: { client: ExtendedClient, params: [GuildMember, GuildMember] }) => {
    if (oldMember.pending && !newMember.pending) client.emit('guildMemberAdd', newMember);
};

export default guildMemberUpdateEvent;
