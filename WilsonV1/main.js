// Copyright (c) 2022, GGStudioX. All rights reserved.

//Setting the bot
const Discord = require("discord.js");
const bot = new Discord.Client({ intents: 3276799 })
const loadCommand = require("./Loaders/loadCommands")

require('dotenv').config();

const prefix = 'Wilson'
//const botID = '772134999922704435'

//Keep datas of commands
bot.commands = new Discord.Collection();

//Turning it on & verifying all the commands
bot.login(process.env.TOKEN);
loadCommand(bot);


bot.on("messageCreate", async message => {

    //Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    //Return Statements
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type === 'dm') {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, You cannot use any command on DM.'
            }
        });
    }


    //N°1 --- PING ---
    if (cmd === "ping") return bot.commands.get("ping").run(bot, message);


    //N°2 --- HELP /  HELP ADMIN ---
    if (cmd === "help" || cmd.content === "help" || cmd.content === "help" || cmd.content === "help") {
        if (args[0] === "Admin" ||  args[0] === "A" || args[0] === "admin" || args[0] === "a") {
            if (message.member.roles.cache.find(r => r.name === 'botadmin')) {

                return bot.commands.get("admin").run(bot, message);
            } else {

                await message.reply({
                    content : `Sorry, you are not allowed to run this command because you are not administrator.`,
                    
                    //ephemeral : true,
                })
            }
        } else {

            return bot.commands.get("help").run(bot, message);
        }
    }


    //N°3 --- STATUS ---
    if (cmd === "status") {
        if (message.member.roles.cache.find(r => r.name === 'botadmin')) {
            
            return bot.commands.get("status").run(bot, message, args);
        } else {
            
            await message.reply({
                content : `Sorry, you are not allowed to run this command because you are not administrator.`,
                    
                //ephemeral : true,
            })
        }
    }


    //N°4 --- MAINTENANCE ---
    if (cmd === "go") {
        if (message.member.roles.cache.find(r => r.name === 'botadmin')) {
            
            return bot.commands.get("maintenance").run(bot, message, args);
        } else {
            
            await message.reply({
                content : `Sorry, you are not allowed to run this command because you are not administrator.`,
                    
                //ephemeral : true,
            })
        }
    }

})


bot.on("ready", async () => {

    console.log(" \n Bot is on and ready to go ! Enjoy !")
})