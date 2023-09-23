const Discord = require("discord.js")

module.exports = {

    name: "ping",

    description: "Give the user the ping status",


    async run(bot, message) {

        await message.reply({
            content : `Ping : \`${bot.ws.ping}\``,
            
            //ephemeral : true,
        })
    }
}