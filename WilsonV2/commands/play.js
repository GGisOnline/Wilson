const ytdl = require('ytdl-core');
//const search = require('yt-search');

exports.run = async (bot, message, args, ops) => {

    //If the author is connected to a voice channel
    if (!message.member.voice.channel) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Please connect to a voice channel'
            }
        });
    }

    //Check if the author put a correct URL
    if (!args[0]) {
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Sorry, please put a correct URL following the command'
            }
        });
    }


    //Validate Info
    let validate = await ytdl.validateURL(args[0]);

    //Check Validation
    if(!validate) {

        //Import search.js to simplify the 'play' command
        let commandFile = require('./search.js');
        return commandFile.run(bot, message, args, ops); //This will pass the same variables to the command
    }


    //We also need to define info, we can do that there -- It will store the video info
    let info = await ytdl.getInfo(args[0]);



    //First, we need to fetch the active -- Also, if it's not defined it will be {}
    let data = ops.active.get(message.guild.id) || {};


    //Next, we need to update the data
    if (!data.connection) data.connection = await message.member.voice.channel.join(); //If there isn't a connection, create one
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id; //This one won't be reset ever, so we can just set it whenever we run this

    //if (args[0] === 'loop') {
        //data.loop = !data.loop;
        //message.channel.send('Queue Looped!');
    //}

    //Next, we need to add the song to the queue
    data.queue.push({
        requester: message.author.tag,
        url: args[0],
        //title: args[1],
        announceChannel: message.channel.id,
        //loop: false
    });



    //If there isn't a dispatcher already created, run the play function
    if (!data.dispatcher) {

        play(bot, ops, data).then(r => {
            //message.channel.send("Now Playing : " + data.title);
        });
    } else {

        //Send added to queue message
        return message.channel.send({
            embed: {
                color: 0xFF0000,
                description: 'Added to Queue & Requested by : ' + message.author.username
            }
        });
    }


    //Finally, update the map
    ops.active.set(message.guild.id, data);
}

//Now, we can define the play function
async function play(bot, ops, data) {

    //We can send the now playing message //TODO
    //message.channel.send("Now Playing : ");    OR    bot.channel.message.send(`Now Playing : ${data.queue[0]} | Requested By: ${data.queue[0].requester}`);
    //OR
    //bot.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0]} | Requested By: ${data.queue[0].requester}`);



    //Next, update the dispatcher data
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly', quality: "highestaudio"}));
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.setVolume(process.env.VOLUME);

    //Finally, create a listener event that will run when the song ends
    data.dispatcher.once('finish', function (){
        //When this happens, we want to run a finish function
        finish(bot, ops, data); //We also want to pass these 3 parameters
    });


}


//Now, we can define the finish function
function finish(bot, ops, dispatcher) {

    //First, fetch the guild object from the map
    let fetched = ops.active.get(dispatcher.guildID);

    //Remove first item in queue
    if (!fetched.loop) fetched.queue.shift();

    //Then, check if the queue is empty
    if (fetched.queue.length > 0) { //If not, run this

        //Update the map with the new queue
        ops.active.set(dispatcher.guildID, fetched);

        //Finally, run the play function again which starts the next song
        play(bot, ops, fetched); //Remember to pass these 3 parameters

    } else { //This will run if the queue is empty

        //Delete the guild object from the map
        ops.active.delete(dispatcher.guildID);

        //Leave the voice channel
        //let vc = bot.guild.get(dispatcher.guildID).me.voice.channel; //This gets the voiceChannel of the bot in the guild
        //if (vc) vc.leave(); //If it's in a voice channel, leave it
    }

}