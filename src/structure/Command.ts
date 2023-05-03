import {
    CommandInteraction,
    type SlashCommandSubcommandBuilder,
} from "discord.js"
import CitnutClient from "./Client.js"

type CommandArgs = {
    client: CitnutClient
    interaction: CommandInteraction
}

export type CommandType = {
    author?: string
    config: SlashCommandSubcommandBuilder
    execute: ({ client, interaction }: CommandArgs) => Promise<any> | any;
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
export class Command {
    public readonly author: string = "Citnut"
    public readonly config: CommandType["config"]
    public readonly execute: CommandType["execute"]
    constructor({ author, config, execute }: CommandType) {
        this.author = author ? author : "Citnut"
        this.config = config
        this.execute = execute
    }
}