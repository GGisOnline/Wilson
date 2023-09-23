const fs = require("fs");

exports.run = async (bot, message, args, ops) => {

    message.delete();

    //If the author is adminbot
    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    } else {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: "Sorry, this functionality is under maintenance"
            }
        });
    }

    //If the author is connected to a voice channel
    if (!message.member.voice.channel) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Please connect to a voice channel'
            }
        });
    }

    if (!args[0]){

        const connection = message.member.voice.channel.join();
        const receiver = connection.receiver.createStream(message.member, {
            mode: "pcm",
            end: "silence"
        });

        const writer = receiver.pipe(fs.createWriteStream("./record/recorded.pcm"))
        writer.on("finish", () => {
            message.voice.channel.leave();
            message.channel.send("Finish writing Audio !");
        });

    }

    if (args[0]){
        if (args[0] === 'read') {

            if (!fs.existsSync("./record/recorded.pcm")) return message.channel.send("Your audio is not recorded !");

            const connection = message.member.voice.channel.join();
            const stream = fs.createReadStream("./record/recorded.pcm");

            const dispatcher = connection.play(stream, {
                type: "converted"
            });

            dispatcher.on("finish", () => {
                message.member.voice.channel.leave();
                message.channel.send('Finished playing Audio');
            })

        } else {

            const user = message.mentions.members.first();
            if (!user) return message.reply('Please use a proper mention if you want to mute someone.');
            if (!user.voice.channel) return message.channel.send('Not connected to a voice channel');

            const connection = await user.voice.channel.join();

            const receiver = connection.receiver.createStream(message.mentions.members.first(), {
                mode: "pcm",
                end: "manual"
            });

            const writer = receiver.pipe(fs.createWriteStream("./record/recorded.pcm"))
            writer.on("finish", () => {
                user.voice.channel.leave();
                message.channel.send("Finish writing Audio !");
            });
        }

        if (args[0] === 'finish') {

            writer.emit("finish")
            //First, we need to fetch the guild object
            let fetched = ops.active.get(message.guild.id);

            //Then, we need to check if what we fetched is definied
            if (!fetched) return message.channel.send('There currently is\'t any music playing in the server !')
        }
    }
}