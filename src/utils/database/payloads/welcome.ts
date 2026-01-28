export interface WelcomePayload {
    guildID: string;
}

const welcomePayload = ({ guildID }: WelcomePayload) => {
    return {
        guildID,
        enabled: false,
        welcomeEnabled: false,
        welcomeMessage: "Bienvenue {user:mention} dans le serrveur {guild:name} !",
        goodbyeEnabled: false,
        goodbyeMessage: "Au revoir {user:tag} !",
    };
};

export default welcomePayload;
