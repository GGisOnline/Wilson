exports.run = (bot, message, args, ops) => {

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    }

    message.delete();

    if (!args[0]) {
        message.channel.messages.fetch({limit: 2}).then(messages => {
            message.channel.bulkDelete(messages)
        });

    } else {
        if (isNaN(args[0])) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'The amount parameter isn`t a number!'
                }
            });
        } // Checks if the `amount` parameter is a number. If not, the command throws an error

        if (args[0] > 100) {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'You cannot delete more than 100 messages at once!'
                }
            });
        } // Checks if the `amount` integer is bigger than 100


        try {
            message.channel.messages.fetch({ limit: args[0] }).then(messages => { // Fetches the messages
                message.channel.bulkDelete(messages)

            });
        } catch (e) {
            return message.channel.send('Sorry, You cannot delete messages that are under 14 days old !');
        }

    }
}