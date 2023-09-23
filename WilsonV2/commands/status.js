const Discord = require('discord.js');
const dateFormat = require('dateformat');
const os = require('os');

exports.run = async (bot, message, args, ops) => {


    message.delete();

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return await message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    }


    //Data to put in embed

    let global;
    if (process.env.LOCK === 'false' && process.env.MAINT === 'false'){
        global = 'Good ✅';
    };

    if (process.env.LOCK === 'false' && process.env.MAINT === 'true' || process.env.LOCK === 'true' && process.env.MAINT === 'false'){
        global = 'In Work ⚠';
    };

    if (process.env.LOCK === 'true' && process.env.MAINT === 'true'){
        global = 'Bad ❌';
    }

    let lock;
    if (process.env.LOCK === 'true'){
        lock = 'LOCKED ❌';
    } else {
        lock = 'UNLOCKED ✅';
    };

    let maintenance;
    if (process.env.MAINT === 'true'){
        maintenance = 'In Progress ⚠';
    } else {
        maintenance = 'No Maintenance ✅';
    };


    //Members
    let member = message.guild.members;
    let offline = member.cache.filter(m => m.presence.status === "offline").size,
        online = member.cache.filter(m => m.presence.status !== "offline").size,
        robot = member.cache.filter(m => m.presence.bot).size,
        total = message.guild.memberCount;

    //Channels
    let channels = message.guild.channels;
    let text = channels.cache.filter(r => r.type === "text").size,
        vc = channels.cache.filter(r => r.type === "voice").size,
        category = channels.cache.filter(r => r.type === "category").size,
        totalchan = channels.cache.size;

    //Date
    let created = dateFormat(message.guild.createdAt);
    let x = Date.now() - message.guild.createdAt;
    let h = Math.floor(x / 86400000);



    //Get servers informations
    let region = {
        "brazil" : "Brazil",
        "eu-central" : "Central Europe",
        "eu-west" : "Western Europe",
        "europe" : "Europe",
        "singapore" : "Singapore",
        "london" : "London",
        "russia" : "Russia",
        "japan" : "Japan",
        "hongkong" : "Hongkong",
        "sydney" : "Sydney",
        "us-central" : "U.S. Central",
        "us-east" : "U.S. East",
        "us-south" : "U.S. South",
        "us-west" : "U.S. West"
    }

    let location = region[message.guild.region];



    //Get CPU's informations
    let cpus = os.cpus();
    let cpupro = cpus[0];


    let processor = [];
    for (let types in cpupro.model) {
        processor += cpupro.model[types];
    }



    //Send Message
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor(0xFF0000)
        .setTitle(`Intern status of Wilson`)
        .setAuthor('Wilson', 'https://cdn.discordapp.com/attachments/778253840214392832/786020680126038056/circle-cropped_1.png')
        .setDescription(`The QG is born ${created} : since **${h}** day(s)`)
        .setThumbnail('https://cdn.discordapp.com/attachments/778253840214392832/778660944783736864/TheQG_LOGO_SF_1.png')
        .addFields(
            {name: '\u200B', value: '\u200B' },
            { name: 'Global Status', value: global, inline: true },
            { name: 'Lock Status', value: lock, inline: true },
            { name: 'Maintenance Status', value: maintenance, inline: true },
            { name: 'Discord Status', value: 'Good ✅', inline: true },
            { name: 'Heroku Status', value: 'Good ✅', inline: true },
            { name: 'RaspberryPi Status', value: 'Good ✅', inline: true },
            {name: '\u200B', value: '\u200B' },
            { name: 'Processor details', value: processor },
            { name: 'Region of the Server', value: location, inline: true },
            {name: '\u200B', value: '\u200B' },
            { name: 'Number of Members', value: total, inline: true },
            { name: 'Number of Channels', value: totalchan, inline: true },
            { name: 'Number of BOT(s)', value: "1", inline: true }
        )
        .setTimestamp()
        .setFooter('By GG.StudioX');

    await message.channel.send(exampleEmbed);
}
