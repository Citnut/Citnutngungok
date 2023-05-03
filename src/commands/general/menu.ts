import { EmbedBuilder, SlashCommandSubcommandBuilder } from "discord.js"
import { Command } from "../../structure/Command.js"
const menu = (client: any, result: any) => {
    let str: Array<string> = []
    client.application?.commands.cache.each((e: any) => str.push(e.name))
    result.setTitle("Danh sách lệnh:").setDescription(str.join(", "))
    return result
}
export default new Command({
    config: new SlashCommandSubcommandBuilder()
        .setName("menu")
        .setDescription("gọi lệnh này sẽ hiện ra tất cả các lệnh của bot")
        .addStringOption(options => options
            .setName("name")
            .setDescription("tên của 1 câu lệnh bạn chưa biết dùng")
            .setAutocomplete(true)
            .setRequired(false)
        ),
    execute: async ({ client, interaction }) => {

        await interaction.deferReply({ ephemeral: true })

        const data = interaction.options.data[0]
        let result = new EmbedBuilder().setColor("Random")

        if (!data) return await interaction.editReply({ embeds: [menu(client, result)] })

        let command = client.commands.get(data.value as string)
        if (!command) return await interaction.editReply({ embeds: [menu(client, result)] })

        result
            .setTitle(command.config.name)
            .setDescription(`author: ${command.author}\ndescription: ${command.config.description}`)

        return await interaction.editReply({ embeds: [result] })
    }
})