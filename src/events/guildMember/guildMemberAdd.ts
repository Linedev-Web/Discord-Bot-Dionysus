import {GuildMember} from "discord.js";
import {ExtendedClient} from "../../types";
import { startOnboarding } from "../onboarding/onboardingLogic";

const guildMemberAddEvent = async ({client, params: [member]}: { client: ExtendedClient, params: [GuildMember] }) => {
    if (member.pending) return;

    // Lancement de l'onboarding
    await startOnboarding(client, member);

    const welcomeDB = await client.db.selectWelcomeByGuildId({guildID: member.guild.id});

    if (!welcomeDB.enabled || !welcomeDB.welcomeEnabled) return;

    const welcomeChannelID = welcomeDB.welcomeChannelID;
    const welcomeChannel = welcomeChannelID ? await member.guild.channels.fetch(welcomeChannelID).catch(() => null) : null;

    if (!welcomeChannel || !('send' in welcomeChannel)) return;

    // Si l'onboarding n'a pas pu être envoyé en DM, on peut proposer un bouton ici
    // Mais pour l'instant on garde la logique de bienvenue classique
    let attachment;
    try {
        const { WelcomeLeave } = require("canvafy");
        const welcomeCard = await new WelcomeLeave()
            .setAvatar(member.user.displayAvatarURL({extension: "png", forceStatic: true}))
            .setBackground("image", `https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0`)
            .setTitle('Bienvenue')
            .setDescription(`Passe un bon moment sur ${member.guild.name}`)
            .setBorder('#000')
            .setAvatarBorder('#000')
            .setOverlayOpacity(0.6).build();
        
        attachment = {attachment: (welcomeCard as any).toBuffer(), name: `welcome-${member.id}.png`};
    } catch (error) {
        // On ne log pas l'erreur complète si c'est un problème de module manquant pour éviter de polluer la console à chaque arrivée
        if (error instanceof Error && error.message.includes('canvas.node')) {
            console.warn(`[Avertissement] L'image de bienvenue n'a pas pu être générée (dépendances canvas manquantes sur le système).`);
        } else {
            console.error("Erreur lors de la génération de l'image de bienvenue (canvafy/canvas) :", error);
        }
        console.log("Le bot continue sans image de bienvenue.");
    }

    welcomeChannel.send({
        content: welcomeDB.welcomeMessage.replace("{user:mention}", member.toString()).replace("{guild:name}", member.guild.name),
        files: attachment ? [attachment] : []
    });
};

export default guildMemberAddEvent;
