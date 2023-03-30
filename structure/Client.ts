import { Client, Collection, GatewayIntentBits } from "discord.js"

class CitnutClient extends Client {
    public commands: Collection<any, any> = new Collection()
    constructor(){
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildIntegrations
            ]
        })
    }
}

export default CitnutClient