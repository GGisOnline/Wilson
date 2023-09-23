exports.run = async (bot, message, args, ops) => {

    //If the author is adminbot
    if(!message.member.roles.cache.find(r => r.name === 'botadmin')) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, only Admins can use this Command'
            }
        });
    }

    return message.channel.send({
        embed: {
            color: 0xFF0000,
            description: "Sorry, this functionality is under maintenance"
        }
    })
        .then(msg => {
            setTimeout(function() {
                msg.edit(`Loading  0%`)
            }, 2000);
            setTimeout(function() {
                msg.edit(`Loading.  25%`)
            }, 4000);
            setTimeout(function() {
                msg.edit(`Loading..  50%`)
            }, 6000);
            setTimeout(function() {
                msg.edit(`Loading...  75%`)
            }, 8000);
            setTimeout(function() {
                msg.edit(`Wilson has been successfully reset !`)
            }, 10000);
            setTimeout(function () {
                process.exit(0)
            }, 10500) } );
}

