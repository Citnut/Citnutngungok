import { error, system, custom, warn } from "./common/logger.js"
import { checkfile } from "./common/utilities.js"
import CitnutClient from "./structure/Client.js"
import dotenv from "dotenv"
import { readdirSync } from "node:fs"
import Command from "./structure/Command.js"

function main() {
    if (!checkfile("./.env", "TOKEN = ")) {
        system("initialized file .env")
        process.exit(1)
    }
    dotenv.config()
    const runType = process.argv.includes("-js") ? ".js" : ".ts"
    const client = new CitnutClient
    client.login(process.env.TOKEN)
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isChatInputCommand()) try { return await client.commands.get(interaction.commandName)!.execute({ client, interaction }) } catch { error }
    })
    client.on("ready", async () => {
        const commandDir = readdirSync("./commands").filter(e => e.endsWith(runType))
        let command: Array<Command> = []
        let commandConfig = []
        for (const once of commandDir) try { command.push((await import(`./commands/${once}`)).default) } catch { error }
        for (const once of command) {
            commandConfig.push(once.config)
            client.commands.set(once.config.name, once)
        }
        client.application?.commands.set(commandConfig)
        custom(`Logged in successfully: ${client.user?.tag}`, "Client")
    })
    client.on("warn", warn)
    client.on("error", error)
}
;
(async function () {
    try {
        main()
    } catch (e) {
        error(e)
        setTimeout(main, 5000)
    }
})()