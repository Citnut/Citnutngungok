import { SlashCommandBuilder } from 'discord.js'
import Command from '../../structure/Command.js' //can edit this path
//
export default new Command({
    config: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("pong")
        .toJSON(),
    async execute({ client, interaction }) {
        const msg = await interaction.deferReply({ ephemeral: true })
        msg.edit("pong")
    }
})