import { ExtendedClient } from "../../types";

const readyEvent = async ({ client }: { client: ExtendedClient }) => {
    client.user?.setActivity('J\'aime le vins Rouge.');
    
    if (process.argv.includes('--slashs')) {
        console.log(`[${client.user?.tag}]: Enregistrement des commandes Slash...`);
        if (process.env.NODE_ENV === 'production') {
             await client.application?.commands.set(client.slashs.filter((s: any) => {
                 const cmd = client.commands.get(s.name);
                 return cmd && cmd.help.category !== 'owner';
             }));
        } else {
            const testGuildID = process.env.TEST_GUILD;
            if (testGuildID) {
                const testGuild = await client.guilds.fetch(testGuildID);
                await testGuild.commands.set(client.slashs);
            } else {
                console.warn("Attention: TEST_GUILD non défini dans .env, impossible de déployer les commandes en mode développement.");
            }
        }
        console.log(`[${client.user?.tag}]: j'ai correctement chargé ${client.slashs.length} commande(s).`);
    }

    console.log(`[${client.user?.tag}]: je suis connecté.`);
};

export default readyEvent;
