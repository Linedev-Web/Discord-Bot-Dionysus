import { GuildMember } from "discord.js";
import { ExtendedClient } from "../../types";
const guildMemberRemoveEvent = async ({ client, params: [member] }: { client: ExtendedClient, params: [GuildMember] }) => {
    if (member.pending) return;

    const welcomeDB = await client.db.selectWelcomeByGuildId({ guildID: member.guild.id });

    if (!welcomeDB.enabled || !welcomeDB.goodbyeEnabled) return;

    const goodbyeChannelID = welcomeDB.goodbyeChannelID;
    const goodbyeChannel = goodbyeChannelID ? await member.guild.channels.fetch(goodbyeChannelID).catch(() => null) : null;

    if (!goodbyeChannel || !('send' in goodbyeChannel)) return;

    let attachment;
    try {
        const { WelcomeLeave } = require("canvafy");
        const goodbyeCard = await new WelcomeLeave()
            .setAvatar(member.user.displayAvatarURL({ extension: "png", forceStatic: true }))
            .setBackground("image", `https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0`)
            .setTitle('Au revoir')
            .setDescription(`Nous espérons te revoir.`)
            .setBorder('#000')
            .setAvatarBorder('#000')
            .setOverlayOpacity(0.6).build();
        
        attachment = { attachment: (goodbyeCard as any).toBuffer(), name: `goodbye-${member.id}.png` };
    } catch (error) {
        // On ne log pas l'erreur complète si c'est un problème de module manquant
        if (error instanceof Error && error.message.includes('canvas.node')) {
            console.warn(`[Avertissement] L'image de départ n'a pas pu être générée (dépendances canvas manquantes sur le système).`);
        } else {
            console.error("Erreur lors de la génération de l'image de départ (canvafy/canvas) :", error);
        }
        console.log("Le bot continue sans image de départ.");
    }

    goodbyeChannel.send({
        content: welcomeDB.goodbyeMessage.replace("{user:tag}", member.user.tag),
        files: attachment ? [attachment] : []
    });
};

export default guildMemberRemoveEvent;
