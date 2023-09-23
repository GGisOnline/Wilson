const Discord = require("discord.js")
const os = require('os');

module.exports = {

    name: "status",

    description: "Give the administrator the status of the system.",


    async run(bot, message) {

        let cpus = os.cpus();
        let cpupro = cpus[0];


        let processor = [];
        for (let types in cpupro.model) {
            processor += cpupro.model[types];
        }

        await message.reply({
            content : processor,
            
            //ephemeral : true,
        })
    }
}