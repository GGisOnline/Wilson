exports.run = async (bot, message, args, ops) => {

    //If the author is connected to a voice channel
    if (!message.member.voice.channel) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Please connect to a voice channel'
            }
        });
    }

    //Check if bot is already connected to a voice channel
    if (!message.guild.me.voice.channel) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, the bot is not connected to a voice channel..'
            }
        });
    }

    //Check if the author & the bot are in the same channel
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, you are not connected to the same channel'
            }
        });
    }

    //Leave Channel
    message.member.voice.channel.leave();
    ops.active.delete(message.guild.id);


    //Send Message
    return message.channel.send({
        embed: {
            color: 0xFF0000,
            description: 'Correctly left !'
        }
    });
}