import { Modal } from "../../types";

const welcomeMessageModal: Modal = {
    run: async ({ client, interaction }) => {
        const message = interaction.fields.getTextInputValue("message");
        const params = interaction.customId.split(':');
        const type = params[1] as 'welcome' | 'goodbye';

        const types = {
            welcome: "Bienvenue", 
            goodbye: "Au revoir"
        };
        
        if (interaction.guildId) {
            await client.db.updateWelcomeSetModuleMessageByGuildID({ 
                guildID: interaction.guildId, 
                type, 
                message 
            });
        }

        interaction.reply({ content: `Le message du module de \`${types[type]}\` a été modifié.` });
    }
};

export default welcomeMessageModal;
