import { SlashCommandSubcommandBuilder } from 'discord.js'
import { Command } from '../../structure/Command.js';
export default new Command({
    config: new SlashCommandSubcommandBuilder()
        .setName("ping")
        .setDescription("pong"),
    execute: async ({ interaction }) => {
        interaction.reply("Pong!");
    }
})