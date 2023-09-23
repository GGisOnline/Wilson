exports.run = (bot, message, args, ops) => {

    message.delete();

    //If the author is connected to a voice channel
    if (!message.member.voice.channel) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Please connect to a voice channel'
            }
        });
    }

    //First, we need to fetch the guild object
    let fetched = ops.active.get(message.guild.id);

    //Then, we need to check if what we fetched is definied
    if (!fetched) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: "There currently isn't any music playing in this guild!"
            }
        });
    }

    //Check if the user is in the same channel as the bot
    if (message.member.voice.channel !== message.guild.me.voice.channel) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: "Sorry, you currently aren't in the same channel as the bot"
            }
        });
    }

    //Then, check if the music is already paused
    if (!fetched.dispatcher.paused) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'The music is already playing.'
            }
        });
    }

    //Finally, if it hasn't returned yet, resume the music
    //Note, these actions are a 'hotfix' found @ https://github.com/Androz2091/discord-player/issues/252#issuecomment-822014540

    fetched.dispatcher.resume();
    fetched.dispatcher.pause();
    fetched.dispatcher.resume();

    return message.channel.send({
        embed: {
            color: 0xFF0000,
            description: "Successfully resumed the song !"
        }
    });
}