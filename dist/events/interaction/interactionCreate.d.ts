import { Interaction } from "discord.js";
import { ExtendedClient } from "../../types";
declare const interactionCreateEvent: ({ client, params: [interaction] }: {
    client: ExtendedClient;
    params: [Interaction];
}) => Promise<void> | Promise<import("discord.js").InteractionResponse<boolean>> | undefined;
export default interactionCreateEvent;
//# sourceMappingURL=interactionCreate.d.ts.map