import { ExtendedClient } from "../../types";

const readyEvent = async ({ client }: { client: ExtendedClient }) => {
    client.user?.setActivity('J\'aime le vins Rouge.');
    
    if (process.argv.includes('--slashs')) {
        if (process.env.NODE_ENV === 'production') {
             await client.application?.commands.set(client.commands.filter(c => c.help.category !== 'owner').map(c => client.slashs.find(s => (s as any).name === c.help.name)!));
        } else {
            const testGuildID = process.env.TEST_GUILD;
            if (testGuildID) {
                const testGuild = await client.guilds.fetch(testGuildID);
                await testGuild.commands.set(client.slashs);
            }
        }
        console.log(`[${client.user?.tag}]: j'ai correctement chargé ${client.slashs.length} commande(s).`);
    }

    console.log(`[${client.user?.tag}]: je suis connecté.`);
};

export default readyEvent;
