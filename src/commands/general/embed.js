module.exports = {
    run: ({client, interaction}) => {

        const embed = {
            color: 0x0099ff,
            title: 'Some title',
            url: 'https://discord.js.org',
            author: {
                name: interaction.user.tag,
                icon_url: interaction.user.displayAvatarURL(),
                url: 'https://discord.js.org',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            fields: [
                {
                    name: 'Regular field title',
                    value: 'Some value here',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: client.user.tag,
                icon_url: client.user.displayAvatarURL(),
            },
        }

        interaction.reply({embeds: [embed]})
    },
    help: {
        description: "Afficher notre embed"
    }
}