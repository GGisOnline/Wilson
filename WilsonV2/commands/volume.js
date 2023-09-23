exports.run = (bot, message, args, ops) => {

    message.delete();

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

    if(!args[0]){
        const statvolume = fetched.dispatcher.volume * 100;
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'The volume is currently at ' + statvolume
            }
        });

    } else {

        //Check if the user is in the same channel as the bot
        //if (message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Sorry, you currently aren't in the same channel as the bot");

        //Check if they input a number between 0-200 -- NOTE : There isn't limit, but the quality become lower when it goes above 200
        if (args[0] > 200 || args[0] < 0) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Please input a number between 0-200'
                }
            });
        }

        //Finally, change the volume to their input */100
        fetched.dispatcher.setVolume(args[0]/100);
        process.env.VOLUME = (args[0] / 100);

        //Send Output
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Successfully set the volume to ' + args[0]
            }
        });
    }
}