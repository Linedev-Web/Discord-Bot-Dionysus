export interface WelcomePayload {
    guildID: string;
}
declare const welcomePayload: ({ guildID }: WelcomePayload) => {
    guildID: string;
    enabled: boolean;
    welcomeEnabled: boolean;
    welcomeMessage: string;
    goodbyeEnabled: boolean;
    goodbyeMessage: string;
};
export default welcomePayload;
//# sourceMappingURL=welcome.d.ts.map