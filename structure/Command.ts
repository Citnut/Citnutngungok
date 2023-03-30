import {
    CommandInteraction,
    Message,
    GuildMember,
    CommandInteractionOptionResolver,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import CitnutClient from "./Client.js"

interface ExtendCommandInteraction extends CommandInteraction {
    message: Message
    member: GuildMember
    options: CommandInteractionOptionResolver
}

interface CommandArgs {
    client: CitnutClient
    interaction: ExtendCommandInteraction
}

interface CommandType {
    config: RESTPostAPIChatInputApplicationCommandsJSONBody
    execute({ client, interaction }: CommandArgs): Promise<any>
}
/**
 * @example 
 * ```js
 * import { SlashCommandBuilder } from "discord.js"
 * import Command from "../structure/Command.js"
 *
 * export default new Command({
 *      config: new SlashCommandBuilder()
 *          .setName("ping")
 *          .setDescription("example")
 *          .toJSON(),
 *      execute: async ({ client, interaction }) => {
 *          interaction.reply("pong!")
 *      }
 * })
 * ```
 * @link https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files
 */
export default class {
    public readonly config: CommandType["config"]
    public readonly execute: CommandType["execute"]
    constructor({ config, execute }: CommandType) {
        this.config = config
        this.execute = execute
    }
}