module.exports = ({guildID}) => {
    return {
        guildID,
        enabled: false,
        welcomeEnabled: false,
        welcomeMessage: "Bienvenue {user:mention} dans le serrveur {guild:name} !",
        goodbyeEnabled: false,
        goodbyeMessage: "Au revoir {user:tag} !",
    }
}