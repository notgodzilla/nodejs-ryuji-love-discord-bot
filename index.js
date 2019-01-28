var auth = require('./auth.json')
var love = require('./love.json')
var random  = require('./random.json')
var motivational = require('./motivational.json')
var people = require('./people.json')
var compliments = require('./compliments.json')

const Broseiden = require('broseiden')
const Wonderful  = require('wonderful')


//TODO These aren't being used yet 
const NiceJob = require('nicejob')

const uniqueRandomArray = require('unique-random-array')

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

	//TODO Use this to parse entire message to lowercase
	//CURRENTLY NOT BEING USED 
	var msgSent = message.content.toLowerCase()

	if(!message.author.bot && message.content.includes('hey, ryuji!')) {

		//console.log(message.author.tag)
		//console.log(message.content)

		if(message.content.includes('love')) {

			var wonderfulWord = Wonderful.random()
			var getLoveEmoji = trueOrFalse() ? "softryuji" : "ryujilovesyou"
			var loveEmoji = (message.guild.emojis.find(emoji => emoji.name == getLoveEmoji))
			message.react(loveEmoji)
			message.channel.send(`${getRandomMessage(love)} You're freakin' ${wonderfulWord}, man!`)


		} else if(message.content.includes('depressed') || message.content.includes('sad') || message.content.includes('strength')) {

			//Randomizes compliments / motivational quotes
			if(trueOrFalse()) {
				var broWord = Broseiden()
				var wonderfulWord = Wonderful.random()
				var complimentSentence = getRandomMessage(compliments)
				var fullSentence = `Hey, ${broWord} ! Don't be sad. You're pretty ${wonderfulWord}! ${complimentSentence}`
				message.channel.send(fullSentence)

			} else {
				message.channel.send(getRandomMessage(motivational))
			}

		} else if (message.content.includes('fuck')) {
			message.channel.send("Hey, man! Language!")

		//TODO add the rest of the phantom thieves 
		} else if(message.content.includes('akechi') || message.content.includes('goro')) {
			var msg = uniqueRandomArray(people['akechi'])
			message.channel.send(msg())

		} else if (message.content.includes('dog fact')) {
			message.channel.send(generateDogFact())
		} else {
			message.channel.send(getRandomMessage(random))
		}
	}
})

function generateDogFact() {			
	var afterFactSentence = [
		"Isn't that shit cool?!", 
		"Freakin' awesome, right?!", 
		"Did ya know that?",
		"Cool, right?",
		"Crazy, right?",
		"Freakin' cool!"]
	
	var randomDogFact = DogFacts.random() 
	var end = afterFactSentence[Math.floor(Math.random()*afterFactSentence.length)]
	return `${randomDogFact} ${end}`
}

function trueOrFalse() {
	return Math.round(Math.random()) == 1 
}

function getRandomMessage(messageSource) {
	var randomMessage = uniqueRandomArray(messageSource)
	return randomMessage() 
}

ryuji.login(auth.TOKEN)
