import { 
    Client, 
    Collection, 
    ChatInputCommandInteraction, 
    AutocompleteInteraction, 
    ModalSubmitInteraction,
    ClientOptions,
    ApplicationCommandDataResolvable,
    PermissionResolvable
} from 'discord.js';

export interface ExtendedClient extends Client {
    config: BotConfig;
    commands: Collection<string, Command>;
    slashs: ApplicationCommandDataResolvable[];
    autocompletes: Collection<string, Autocomplete>;
    modals: Collection<string, Modal>;
    db: any; // On pourra affiner ce type plus tard avec Prisma
}

export interface BotConfig {
    color: number;
    intents: number;
}

export interface CommandRunOptions {
    client: ExtendedClient;
    interaction: ChatInputCommandInteraction;
}

export interface Command {
    run: (options: CommandRunOptions) => Promise<any> | any;
    help: {
        name?: string;
        category?: string;
        description: string;
        options?: any[];
        memberPermissions?: PermissionResolvable[];
        botPermissions?: PermissionResolvable[];
        dmPermission?: boolean;
        examples?: string[];
    };
}

export interface Autocomplete {
    run: (options: { client: ExtendedClient, interaction: AutocompleteInteraction }) => Promise<any> | any;
}

export interface Modal {
    run: (options: { client: ExtendedClient, interaction: ModalSubmitInteraction }) => Promise<any> | any;
}
