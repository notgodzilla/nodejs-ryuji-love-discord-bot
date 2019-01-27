var auth = require('./auth.json')
var love = require('./love.json')
var random  = require('./random.json')
var motivational = require('./motivational.json')
var people = require('./people.json')

const Discord = require('discord.js')
const DogFacts = require('dog-facts')

const ryuji = new Discord.Client()
//const welcomeServerId = 533510779240972299 - welcome channel for actual server
const welcomeServerId = 537447847059259412 // welcome channel id for test server 

//TODO Use these for randomly generated stories 
const phantomThieves = ['akira', 'ann', 'makoto', 'yusuke', 'futaba', 'haru', 'morgana', 'akechi']
const adults = ['sae', 'sojiro', 'ma']

const welcomeMessage = 
"HEY, BRO! Welcome to RYUJI PARADISE! Read the #ryuji-rules and introduce yourself here, telling us why you love ME, the GREAT RYUJI SAKAMOTO, and don't forget to include your age (if you're 18+)!"

ryuji.on('guildMemberAdd', (member) => {
  const welcomeChannel = ryuji.channels.find(channel => channel.id == welcomeServerId)
  var newMemberId = member.user.id 
  welcomeChannel.send("<@!" + newMemberId + ">" + " " + welcomeMessage)
});

ryuji.on('message', function(message) {

	//TODO Use this to parse 'hey, ryuji!' command
	var msgSent = message.content.toLowerCase()

	if(!message.author.bot && message.content.includes('hey, ryuji!')) {
		//console.log(message.author.tag)
		//console.log(message.content)

		if(message.content.includes('love')) {

			var reply = getRandomMessage(love)
			message.channel.send(reply)

		} else if(message.content.includes('depressed') || message.content.includes('sad') || message.content.includes('strength')) {

			var reply = getRandomMessage(motivational)
			message.channel.send(reply)

		} else if (message.content.includes('fuck')) {
			message.channel.send("Hey, man! Language!")

		//TODO add the rest of the phantom thieves 
		} else if(message.content.includes('akechi') || message.content.includes('goro')) {
			var msg = people["akechi"]['0']
			message.channel.send(msg)

		} else if (message.content.includes('dog fact')) {
			var randomDogFact = DogFacts.random() 
			message.channel.send(randomDogFact)

		}else {
			var reply = getRandomMessage(random)
			message.channel.send(reply)
		}
	}
})

function getRandomMessage(messageSource) {
	var length = Object.keys(messageSource).length - 1 
	var i = generateRandomNumber(length)
	return messageSource[i]
}

function generateRandomNumber(maximum) {
	var randomIndex = Math.floor(Math.random() * (maximum+1))
	 return randomIndex.toString()
}

ryuji.login(auth.TOKEN)
