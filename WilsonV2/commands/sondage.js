const Discord = require('discord.js');

exports.run = async (bot, message, args, tools) => {

    //Make sure you delete the original message
    message.delete();

    //This will contain some extra things

    //First, we want to check if the user had input
    if (!args[0]) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Proper Usage: <prefix>poll question'
            }
        });
    }

    //Then, create the embed
    const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setFooter('React to vote')
        .setDescription(args.join(' '))
        .setTitle('Poll made By ' + message.author.username);

    //Finally, using await send message
    let msg = await message.channel.send(embed);

    //React to the message
    await msg.react('❤');
    await msg.react('👍');
    await msg.react('👎');
    await msg.react('⛔');

}