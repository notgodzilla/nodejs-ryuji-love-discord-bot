var auth = require('./auth.json')
var love = require('./love.json')
var random  = require('./random.json')
var motivational = require('./motivational.json')
var people = require('./people.json')

const Discord = require('discord.js')
const ryuji = new Discord.Client()
//const welcomeServerId = 533510779240972299 - welcome channel for actual server
const welcomeServerId = 537447847059259412 // welcome channel id for test server 

//TODO Use these for randomly generated stories 
const phantomThieves = ['akira', 'ann', 'makoto', 'yusuke', 'futaba', 'haru', 'morgana', 'akechi']
const adults = ['sae', 'sojiro', 'ma']

const welcomeMessage = "HEY, BRO! Welcome to RYUJI PARADISE! Read the #ryuji-rules and introduce yourself here, telling us why you love ME, the GREAT RYUJI SAKAMOTO, and don't forget to include your age (if you're 18+)!"

ryuji.on('guildMemberAdd', (member) => {
  const welcomeChannel = ryuji.channels.find(channel => channel.id == welcomeServerId)
  var newMemberId = member.user.id 
  welcomeChannel.send("<@!" + newMemberId + ">" + " " + welcomeMessage)
});

ryuji.on('message', function(message) {

	var msgSent = message.content.toLowerCase()

	if(!message.author.bot && message.content.includes('hey, ryuji!')) {
		//console.log(message.author.tag)
		//console.log(message.content)

		if(message.content.includes('love')) {

			var length = Object.keys(love).length - 1 
			var i = generateRandomNumber(length)
			var reply = love[i]
			message.channel.send(reply)

		} else if(message.content.includes('depressed') || message.content.includes('sad') || message.content.includes('strength')) {

			var length = Object.keys(motivational).length - 1 
			var i = generateRandomNumber(length)
			var reply = motivational[i]
			message.channel.send(reply)

		} else if (message.content.includes('fuck')) {
			message.channel.send("Hey, man! Language!")

		//TODO add the rest of the phantom thieves 
		} else if(message.content.includes('akechi') || message.content.includes('goro')) {
			var msg = people["akechi"]['0']
			message.channel.send(msg)

		} else {

			var length = Object.keys(random).length - 1 
			var i = generateRandomNumber(length)
			var reply = random[i]
			message.channel.send(reply)
		}
	}
})

function generateRandomNumber(maximum) {
	var randomIndex = Math.floor(Math.random() * (maximum+1))
	 return randomIndex.toString()
}

ryuji.login(auth.TOKEN)
