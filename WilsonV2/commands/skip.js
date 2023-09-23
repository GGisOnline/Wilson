exports.run = async (bot, message, args, ops) => {

    //First, we need to fetch the guild object
    let fetched = ops.active.get(message.guild.id);

    //Then, we need to check if what we fetched is definied
    if (!fetched) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'There currently is\'t any music playing in the server !'
            }
        });
    }

    //Check if the user is in the same channel as the bot
    if (message.member.voice.channel !== message.guild.me.voice.channel) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, you currently aren\'t connected to the same channel as the bot'
            }
        });
    } else {

        //Update the Map()
        ops.active.set(message.guild.id, fetched);

        //Emit finish event & return
        return fetched.dispatcher.emit('finish');

        //Send output
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Successfully skipped the song !'
            }
        });


    }
}