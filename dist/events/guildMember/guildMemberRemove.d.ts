import { GuildMember } from "discord.js";
import { ExtendedClient } from "../../types";
declare const guildMemberRemoveEvent: ({ client, params: [member] }: {
    client: ExtendedClient;
    params: [GuildMember];
}) => Promise<void>;
export default guildMemberRemoveEvent;
//# sourceMappingURL=guildMemberRemove.d.ts.map