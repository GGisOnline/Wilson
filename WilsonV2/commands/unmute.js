exports.run = (bot, message, args, ops) => {

    message.delete();

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    }

    if(!args[0]) {

        //If the author is connected to a voice channel
        if (!message.member.voice.channel) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Please connect to a voice channel'
                }
            });
        }

        let channel = message.member.voice.channel;
        for (let member of channel.members) {

            //NEVER MUTE THE BOT --> Personnal choice, not because of a bug
            if (member[1].id === '772134999922704435') return;

            member[1].voice.setMute(false);
        }

        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Everyone is Unmuted !'
            }
        });
    }



    if(args[0]) {

        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Please use a proper mention if you want to mute someone.'
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

        let channel = message.member.voice.channel;
        for (let member of channel.members) {


            if (member[1].id === user.id) {
                member[1].voice.setMute(false);
            }
        }
    }


}