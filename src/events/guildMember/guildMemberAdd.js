const {WelcomeLeave} = require("canvafy");
module.exports = async ({client, params: [member]}) => {
    if (member.pending) return;

    const welcomeDB = await client.db.selectWelcomeByGuildId({guildID: member.guild.id});

    if (!welcomeDB.enabled || !welcomeDB.welcomeEnabled) return;


    const welcomeChannel = welcomeDB.welcomeChannelID ? await member.guild.channels.fetch(welcomeDB.welcomeChannelID).catch(() => null) : null;

    const welcomCard = await new WelcomeLeave()
    .setAvatar(member.user.displayAvatarURL({extension: "png", forceStatic: true}))
    .setBackground("image", `https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0`)
    .setTitle('Bienvenue')
    .setDescription(`Passe un bon moment sur ${member.guild.name}`)
    .setBorder('#000')
    .setAvatarBorder('#000')
    .setOverlayOpacity(0.6).build();

    welcomeChannel?.send({
        content: welcomeDB.welcomeMessage.replace("{user:mention}", member.toString()).replace("{guild:name}", member.guild.name),
        files: [{attachment: welcomCard.toBuffer(), name: `welcome-${member.id}.png`}]
    });
};