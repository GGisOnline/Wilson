exports.run = async (bot, message, args, ops) => {

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only GGisOnline and Admins can use this command.'
            }
        });
    }

    if (args[0] === 'status') {

        if (process.env.LOCK === 'false'){
            await message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Unlocked'
                }
            });
        } else {
            await message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Locked'
                }
            });
        }

    } else {

        if (process.env.LOCK === 'false'){
            process.env.LOCK = 'true';
            await message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Lock Mode Enabled'
                }
            });
        } else {
            process.env.LOCK = 'false';
            await message.channel.send({
                embed: {
                    color: 0xFF0000,
                    description: 'Lock Mode Disabled'
                }
            });
        }
    }
}