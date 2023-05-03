import { error, system, custom, warn } from "./common/logger.js"
import { checkfile } from "./common/utilities.js"
import CitnutClient from "./structure/Client.js"
import dotenv from "dotenv"
import { readdirSync } from "node:fs"
import { Events, ApplicationCommandDataResolvable } from "discord.js"
import * as path from "node:path"
import { writeFile } from "node:fs/promises"

let bruh: number = 0

function main() {
    if (!checkfile("./.env")) {
        system("paste your bot token: ")
        process.stdin.on("data", data => {
            writeFile("./.env", `TOKEN = ${data}`).then(() => {
                system("initialized file .env")
            }).catch(error).finally(main)
        })
    }
    else {
        dotenv.config()
        const runType = process.argv.includes("-js") ? ".js" : ".ts"
        const client = new CitnutClient
        client.login(process.env.TOKEN)
        client.on(Events.InteractionCreate, async (interaction) => {
            if (interaction.isChatInputCommand()) try { return await client.commands.get(interaction.commandName)!.execute({ client, interaction }) } catch { error }
        })
        client.on(Events.ClientReady, async () => {
            let commandsPath: Array<string> = []
            let commandConfig: Array<ApplicationCommandDataResolvable> = []
            readdirSync(path.join("commands")).forEach(x => readdirSync(`./commands/${x}`).filter(e => e.endsWith(runType)).forEach(f => commandsPath.push(`./commands/${x}/${f}`)))
            for (const e of commandsPath) {
                const file = (await import(e)).default
                commandConfig.push(file.config)
                client.commands.set(file.config.name, file)
                custom(`${file.config.name} ${file.config.description ? `(${file.config.description})` : ""} by ${file.author}`, "PLUGIN")
            }
            client.application?.commands.set(commandConfig).then(
                () => {
                    custom(`Logged in successfully: ${client.user?.tag}`, "Client")
                    custom(`loaded ${commandConfig.length}/${commandsPath.length} command(s)`, "PLUGIN")
                }
            ).catch(
                (e) => {
                    error(e)
                    bruh++
                    error(`bruhhhhhh trying to restart ${bruh} time(s)`)
                    main()
                }
            )

        })
        client.on(Events.Warn, warn)
        client.on(Events.Error, error)
    }
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