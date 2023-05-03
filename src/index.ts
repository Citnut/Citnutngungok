import { Events, REST, Routes } from "discord.js"
import { readdir, writeFile } from "fs/promises"
import path from "path"
import { custom, error, system, warn } from "./common/logger.js"
import { checkfile } from "./common/utilities.js"
import CitnutClient from "./structure/Client.js"
import { CommandType } from "./structure/Command.js"
import dotenv from "dotenv"

let bruh = 0

function main() {
    if (!checkfile("./.env")) {
        system("paste your bot token: ")
        process.stdin.on("data", async (data) => {
            await writeFile("./.env", `TOKEN=${data.toString()}`).then(() => {
                system("initialized file .env")
            }).catch(e => error(e))

            dotenv.config()
            main()
        })
    }
    else {
        const mainPath = process.env.NODE_ENV == "production" ? "./dist" : "./src"
        const runType = process.env.NODE_ENV == "production" ? ".js" : ".ts"
        const client = new CitnutClient
        client.login(process.env.TOKEN)
        client.once(Events.ClientReady, async () => {
            custom(`Logged in successfully: ${client.user?.tag}`, "Client")
            let commandsPath: Array<string> = [];
            let commandConfig: Array<CommandType["config"]> = [];

            const allCategory = await readdir(path.join(mainPath, "commands"))
            for(let category of allCategory) {
                const allCommandInCategory = (await readdir(`${mainPath}/commands/${category}`)).filter(e => e.endsWith(runType))
                for(let command of allCommandInCategory) {
                    commandsPath.push(`./commands/${category}/${command}`)
                }
            }

            for (const path of commandsPath) {
                const command: CommandType = (await import(path)).default
                commandConfig.push(command.config)
                client.commands.set(command.config.name, command)
                custom(`${command.config.name} ${command.config.description ? `(${command.config.description})` : ""} by ${command.author}`, "PLUGIN")
            }

            const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

            try {
                custom(`Started refreshing ${[...client.commands.keys()].length} application (/) commands.`);

                const data = await rest.put(
                    Routes.applicationCommands(client.user!.id),
                    {
                        body: client.commands.map((v) => {
                            return v.config.toJSON();
                        })
                    },
                ) as any[];

                custom(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (e) {
                error(e)
                bruh++
                error(`bruhhhhhh trying to restart ${bruh} time(s)`)
                main()
            }
        })

        client.on(Events.InteractionCreate, async (interaction) => {
            if (interaction.isChatInputCommand()) try {
                client.commands.get(interaction.commandName)!.execute({ client, interaction })
            } catch(e) { error(e) }
        })

        client.on(Events.Warn, warn)
        client.on(Events.Error, error)
    }
};

(async function () {
    try {
        main()
    } catch (e) {
        error(e)
        setTimeout(main, 5000)
    }
})()