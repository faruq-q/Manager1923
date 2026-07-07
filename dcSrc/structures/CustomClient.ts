import { Client, ClientOptions, Collection, ButtonInteraction } from 'discord.js';

export class customClient extends Client {

    public buttons: Collection<string, botButton>;
    public selectMenus: Collection<string, any>;
    public modals: Collection<string, any>;
    public customOptions: Collection<string, any>;
    public commands: Collection<string, any>;

    constructor(options: ClientOptions) {
        super(options);

        this.buttons = new Collection();
        this.selectMenus = new Collection();
        this.modals = new Collection();
        this.customOptions = new Collection();
        this.commands = new Collection();
    }
}

export interface botButton {
    customId: string,
    execute: (interaction: ButtonInteraction) => Promise<void> | void;
}