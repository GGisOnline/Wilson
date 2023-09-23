exports.run = async (bot, message, args, ops) => {

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return await message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    }

    if (args[0] === 'status') {

        if (process.env.MAINT === 'false'){
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: "Not In Maintenance Mode !"
                }
            });
        } else {
            return message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: "Currently in Maintenance Mode !"
                }
            });
        }

    } else {

        if (process.env.MAINT === 'false'){
            process.env.MAINT = 'true';
            await message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Maintenance Mode Enabled'
                }
            });

        } else {
            process.env.MAINT = 'false';
            await message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Maintenance Mode Disabled'
                }
            });
        }
    }
}