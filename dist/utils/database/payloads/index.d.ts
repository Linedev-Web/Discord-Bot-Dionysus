declare const payloads: {
    welcome: ({ guildID }: import("./welcome").WelcomePayload) => {
        guildID: string;
        enabled: boolean;
        welcomeEnabled: boolean;
        welcomeMessage: string;
        goodbyeEnabled: boolean;
        goodbyeMessage: string;
    };
};
export default payloads;
//# sourceMappingURL=index.d.ts.map