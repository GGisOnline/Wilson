exports.run = (bot, message, args, ops) => {

    message.delete();

    //console.log(message.member.roles.cache);


    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    }

    if (!args[0]) {

        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: "Sorry, U must mention someone if U want to use this command."
            }
        });
    }

    if (args[0]) {

        const user = message.mentions.members.first();
        if (!user) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Please use a proper mention if you want to mute someone.'
                }
            });
        }

        const reason = args.slice(1).join(" ");
        if(!reason) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'No reasons given !'
                }
            });
        }

        //If the Target is Yourself
        if(user.id === message.author.id){

            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Sorry, U cannot ban yourself !'
                }
            });
        } else {

            //If it's the Founder
            if(message.member.roles.cache.find(r => r.name === 'Fondateur')){

                user.send(`Hello, U have been banned from ${message.guild.name} for : ${reason} by the Founder of TheQG.`).then(() =>
                    user.ban({ days: 0.0001, reason: reason}));
                return message.channel.send({
                    embed: {
                        color: 0xFF0000,
                        description: `**${user.user.tag}** has been banned`
                    }
                });
            }


            //If it's the co-founder
            if(message.member.roles.cache.find(r => r.name === 'Co-Fondateur')){

                if (user.roles.cache.find(r => r.name === 'Fondateur')) {

                    return message.channel.send({
                        embed: {
                            color: 0xFF0000,
                            description: "Sorry, U can't ban someone with a rank above or like U."
                        }
                    });
                } else {

                    user.send(`Hello, U have been banned from ${message.guild.name} for : ${reason} by the Co-Founder of TheQG.`).then(() =>
                        user.ban({ days: 0.0001, reason: reason}));
                    return message.channel.send({
                        embed: {
                            color: 0xFF0000,
                            description: `**${user.user.tag}** has been banned`
                        }
                    });
                }
            }


            //If it's a STAFF Member
            if(message.member.roles.cache.find(r => r.name === 'STAFF')){

                if (user.roles.cache.find(r => r.name === 'Fondateur') || user.roles.cache.find(r => r.name === 'Co-Fondateur') || user.roles.cache.find(r => r.name === 'STAFF')) {

                    return message.channel.send({
                        embed: {
                            color: 0xFF0000,
                            description: "Sorry, U can't ban someone with a rank above or like U."
                        }
                    });
                } else {

                    user.send(`Hello, U have been banned from ${message.guild.name} for : ${reason} by a STAFF Member.`).then(() =>
                        user.ban({ days: 1, reason: reason}));
                    return message.channel.send({
                        embed: {
                            color: 0xFF0000,
                            description: `**${user.user.tag}** has been banned`
                        }
                    });
                }
            }
        }
    }
}