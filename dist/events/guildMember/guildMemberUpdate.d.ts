import { GuildMember } from "discord.js";
import { ExtendedClient } from "../../types";
declare const guildMemberUpdateEvent: ({ client, params: [oldMember, newMember] }: {
    client: ExtendedClient;
    params: [GuildMember, GuildMember];
}) => void;
export default guildMemberUpdateEvent;
//# sourceMappingURL=guildMemberUpdate.d.ts.map