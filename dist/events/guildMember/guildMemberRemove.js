"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { WelcomeLeave } = require("canvafy");
const guildMemberRemoveEvent = async ({ client, params: [member] }) => {
    if (member.pending)
        return;
    const welcomeDB = await client.db.selectWelcomeByGuildId({ guildID: member.guild.id });
    if (!welcomeDB.enabled || !welcomeDB.goodbyeEnabled)
        return;
    const goodbyeChannelID = welcomeDB.goodbyeChannelID;
    const goodbyeChannel = goodbyeChannelID ? await member.guild.channels.fetch(goodbyeChannelID).catch(() => null) : null;
    if (!goodbyeChannel || !('send' in goodbyeChannel))
        return;
    const goodbyeCard = await new WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ extension: "png", forceStatic: true }))
        .setBackground("image", `https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0`)
        .setTitle('Bienvenue')
        .setDescription(`Nous esperons te revoir.`)
        .setBorder('#000')
        .setAvatarBorder('#000')
        .setOverlayOpacity(0.6).build();
    goodbyeChannel.send({
        content: welcomeDB.goodbyeMessage.replace("{user:tag}", member.user.tag),
        files: [{ attachment: goodbyeCard.toBuffer(), name: `goodbye-${member.id}.png` }]
    });
};
exports.default = guildMemberRemoveEvent;
//# sourceMappingURL=guildMemberRemove.js.map