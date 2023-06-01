import { Client, Collection, GatewayIntentBits, Partials } from "discord.js"
import { CommandType } from "./Command"
export default class CitnutClient extends Client {
    public commands: Collection<string, CommandType> = new Collection()
    constructor(){
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions
            ],
            partials: [
                Partials.Channel
            ]
        })
    }
}