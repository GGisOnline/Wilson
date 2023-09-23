const search = require('yt-search');

exports.run = (bot, message, args, ops) => {

    //Search videos based on the arguments
    search(args.join(' '), function(err, res) {
        //Error handling
        if (err) return message.channel.send('Sorry, something went wrong');

        //First, we only want to use the first ten results
        let videos = res.videos.slice(0,10);

        //Then, loop them to create an output string
        let resp = '';
        for (var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }

        //Then, add some more text info instructions
        resp += `\n**Choose 0 to cancel**`;
        resp += `\n**Or choose a number between \`1-${videos.length}\`**`;

        //Send Output
        message.channel.send(resp);

        //Then, we can create a message collector
        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > -1;
        //This is a filter, it will only accept text that is a number between the set range earlier
        const collector = message.channel.createMessageCollector(filter);

        //Update collector variables
        collector.videos = videos;

        //Create a listener
        collector.once('collect', function (m) {

            //Run 'play' command, passing the url as args[0]
            let commandFile = require('./play.js');

            //if (m === 'loop') {
                //args = 'loop';
                //commandFile.run(bot, message, args, ops);
            //} else {}
            if (parseInt(m) == '0'){
                message.channel.send({
                    embed: {
                        color: 0xFF0000,
                        description: 'Song Cancelled'
                    }
                });
            } else {
                commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], ops);
            }

            //message.channel.send('Now Playing : ' + videos[parseInt(m.content)-1].title);
        });

    });

}