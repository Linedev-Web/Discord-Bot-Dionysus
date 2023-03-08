module.exports = async ({client}) => {
    client.user.setActivity('J\'aime le vins.')
    if (process.argv.includes('--slashs')) {
        if (process.env.NODE_ENV === 'production') {
            await client.application.commands.set(client.slashs)
        } else if (process.env.NODE_ENV === 'development') {
            const testGuild = await client.guilds.fetch(process.env.TEST_GUILD)

             await testGuild.commands.set(client.slashs)
        }
        console.log(`[${client.user.tag}]: j'ai correctement chargé ${client.slashs.length} commande(s).`)
    }

    console.log(`[${client.user.tag}]: je suis connecté.`)
}