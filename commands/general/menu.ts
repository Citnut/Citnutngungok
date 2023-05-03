import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
import Command from "../../structure/Command.js"
const menu = (client: any, result: any) => {
    let str: Array<string> = []
    client.application?.commands.cache.each((e: any) => str.push(e.name))
    result.setTitle("Danh sách lệnh:").setDescription(str.join(", "))
    return result
}
export default new Command({
    config: new SlashCommandBuilder()
        .setName("menu")
        .setDescription("gọi lệnh này sẽ hiện ra tất cả các lệnh của bot")
        .addStringOption(options => options
            .setName("name")
            .setDescription("tên của 1 câu lệnh bạn chưa biết dùng")
            .setRequired(false)
        ).toJSON(),
    async execute({ client, interaction }) {
        const msg = await interaction.deferReply({ ephemeral: true, fetchReply: true })
        const data = interaction.options.getString("name")?.toString()
        let result = new EmbedBuilder().setColor("Random")

        if (!data) return msg.edit({ embeds: [menu(client, result)] })

        let command = client.commands.get(data)
        if (!command) return msg.edit({ embeds: [menu(client, result)] })

        result
            .setTitle(command.config.name)
            .setDescription(`author: ${command.config.author}\ndescription: ${command.config.description}`)

        return msg.edit({ embeds: [result] })
    }
})