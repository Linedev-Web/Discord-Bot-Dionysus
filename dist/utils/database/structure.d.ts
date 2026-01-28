export declare const database: {
    createWelcome: ({ guildID }: {
        guildID: string;
    }) => Promise<{
        guildID: string;
        enabled: boolean;
        welcomeEnabled: boolean;
        welcomeChannelID: string | null;
        welcomeMessage: string;
        goodbyeEnabled: boolean;
        goodbyeChannelID: string | null;
        goodbyeMessage: string;
    }>;
    selectWelcomeByGuildId: ({ guildID }: {
        guildID: string;
    }) => Promise<{
        guildID: string;
        enabled: boolean;
        welcomeEnabled: boolean;
        welcomeChannelID: string | null;
        welcomeMessage: string;
        goodbyeEnabled: boolean;
        goodbyeChannelID: string | null;
        goodbyeMessage: string;
    }>;
    updateWelcomeSetEnabledByGuildID: ({ guildID, enabled }: {
        guildID: string;
        enabled: boolean;
    }) => Promise<{
        guildID: string;
        enabled: boolean;
        welcomeEnabled: boolean;
        welcomeChannelID: string | null;
        welcomeMessage: string;
        goodbyeEnabled: boolean;
        goodbyeChannelID: string | null;
        goodbyeMessage: string;
    }>;
    updateWelcomeSetModuleEnabledByGuildID: ({ guildID, type, enabled }: {
        guildID: string;
        type: string;
        enabled: boolean;
    }) => Promise<{
        guildID: string;
        enabled: boolean;
        welcomeEnabled: boolean;
        welcomeChannelID: string | null;
        welcomeMessage: string;
        goodbyeEnabled: boolean;
        goodbyeChannelID: string | null;
        goodbyeMessage: string;
    }>;
    updateWelcomeSetModuleChannelIDByGuildID: ({ guildID, type, channelID }: {
        guildID: string;
        type: string;
        channelID: string;
    }) => Promise<{
        guildID: string;
        enabled: boolean;
        welcomeEnabled: boolean;
        welcomeChannelID: string | null;
        welcomeMessage: string;
        goodbyeEnabled: boolean;
        goodbyeChannelID: string | null;
        goodbyeMessage: string;
    }>;
    updateWelcomeSetModuleMessageByGuildID: ({ guildID, type, message }: {
        guildID: string;
        type: string;
        message: string;
    }) => Promise<{
        guildID: string;
        enabled: boolean;
        welcomeEnabled: boolean;
        welcomeChannelID: string | null;
        welcomeMessage: string;
        goodbyeEnabled: boolean;
        goodbyeChannelID: string | null;
        goodbyeMessage: string;
    }>;
};
export default database;
//# sourceMappingURL=structure.d.ts.map