import { GuildMember } from "discord.js";
import { ExtendedClient } from "../../types";
declare const guildMemberAddEvent: ({ client, params: [member] }: {
    client: ExtendedClient;
    params: [GuildMember];
}) => Promise<void>;
export default guildMemberAddEvent;
//# sourceMappingURL=guildMemberAdd.d.ts.map