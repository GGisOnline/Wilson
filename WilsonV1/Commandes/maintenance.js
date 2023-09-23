const Discord = require('discord.js')


module.exports = {

    name: 'maintenance',

    description: 'Give the maintenance information',


    async run(bot, message, args) {


        if (args[0] === "on") {
            if (process.env.MAINTENANCE === 'false') {
                process.env.MAINTENANCE = 'true'
                process.env.MAINTENANCE_STATE = "under maintenance"
            }
        }

        if (args[0] === "off") {
            if (process.env.MAINTENANCE === 'true') {
                process.env.MAINTENANCE = 'false'
                process.env.MAINTENANCE_STATE = "operational"
            }
        }

        await message.reply({
            content : `I am now  : ${process.env.MAINTENANCE_STATE}`,
            
            //ephemeral : true,
        })
    }
}