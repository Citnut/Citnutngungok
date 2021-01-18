var config = require("../config.json");
var prefix = config.prefix;
var Discord = require("discord.js");
var bot = new Discord.Client();
var logger = require("node-color-log");
var axios = require("axios");



bot.on("message", async message => {
	if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
	let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
	var chat = message.content.toLowerCase().split(" ")[0];
	chat = chat.slice(command.length);

	if (command === "simsimi" || command == "sim"){
		axios({
			url: `https://sim.cunnobi.xyz/api?text=${encodeURI(chat)}&format=JSON`,
			method: "GET",
			mode: "no-cors"
		}).then(res => {
			var rep = /"text":"(.*?)"}/.exec(res.data)[1];
			if (rep){
				message.channel.send(rep)
			};
		})
	};
	if (command == "help"){
		var help = `đây là bot discord ngu ngok của Chính đẹp zai :))\n`;
		help += `bot này chưa có lệnh j đâu. Chính code ra cho vui thoi`;
		message.channel.send(help)
	};
	if (command == "date"){
		var now = new Date;
		message.channel.send(`${now}`)
	}
});
bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", function(){
	console.log(`bot da dang nhap thanh cong, su dung tai khoan: ${bot.user.tag}`);
});


var login = async() => {bot.login(config.token)};


module.exports = {
	login
}