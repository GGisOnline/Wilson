//BOT PART
const Discord = require('discord.js')
const bot = new Discord.Client()
require('dotenv').config()

const prefix = 'Wilson'
const botID = '772134999922704435'
const active = new Map;

//Listener Events
bot.on("message", message => {


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

    //Command Handler
    try {

        //Option%
        let ops = {
            botID : botID,
            active : active
        }


        if (process.env.LOCK === "true" && !message.member.roles.cache.find(r => r.name === 'botadmin') || process.env.MAINT === "true" && !message.member.roles.cache.find(r => r.name === 'botadmin')){
            message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: "Sorry, I'm temporary Locked or in Maintenance ! Please Try again later !"
                }
            });
            let commandFile = require('./commands/fixstatus.js')
            commandFile.run(bot, message, args, ops);
        } else {

            let commandFile = require('./commands/'+ cmd + '.js');
            commandFile.run(bot, message, args, ops);
        }

    } catch (e) {

        return;
    }


});


//Ready Event --> Say when it is ready to launch
bot.on('ready', () => console.log("Successfully Launched ! Enjoy Wilson by GG.StudioX."));

//Token Bot & Running It
bot.login('MTAwMjI0ODA3NTU3MTYzMDE4Mg.G_GB_U.elwqzX7d63c4kUxJVDhSVZPLlvbmgNPkjJ3NDQ');