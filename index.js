var auth = require('./auth.json')
var love = require('./love.json')
var random  = require('./random.json')
var motivational = require('./motivational.json')
var people = require('./people.json')
var compliments = require('./compliments.json')
var specific  = require('./specificResponses.json')

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
const foodKeywords = ['ramen', 'takoyaki','meat','beef bowl','beef','curry', 'food', 'eat']
const sleepKeywords = ['bed', 'sleep', 'bedtime']
const complimentsKeywords = ['cute', 'sexy', 'baby', 'hot', 'handsome']
const specificResponseKeywords = ['kamoshida', 'mom', 'running', 'phantom thieves', 'knee', 'did you know', 'run']

const welcomeMessage = 
"HEY, BRO! Welcome to RYUJI PARADISE! Read the #ryuji-rules and introduce yourself here, telling us why you love ME, the GREAT RYUJI SAKAMOTO, and don't forget to include your age (if you're 18+)!"

ryuji.on('guildMemberAdd', (member) => {
  const welcomeChannel = ryuji.channels.find(channel => channel.id == welcomeServerId)
  var newMemberId = member.user.id 
  welcomeChannel.send("<@!" + newMemberId + ">" + " " + welcomeMessage)
});

ryuji.on('message', function(message) {

	//Converts entire message to lowercase so conditions aren't case sensitive 
	var msgSent = message.content.toLowerCase()

	if(!message.author.bot && msgSent.includes('hey, ryuji!')) {

		//console.log(message.author.tag)
		//console.log(message.content)

		if(msgSent.includes('love')) {

			var wonderfulWord = Wonderful.random()
			var getLoveEmoji = trueOrFalse() ? "softryuji" : "ryujilovesyou"
			var loveEmoji = (message.guild.emojis.find(emoji => emoji.name == getLoveEmoji))
			message.react(loveEmoji)
			message.channel.send(`${getRandomMessage(love)} You're freakin' ${wonderfulWord}, man!`)


		} else if(msgSent.includes('depressed') || msgSent.includes('sad') || msgSent.includes('strength')) {

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

		} else if (msgSent.includes('fuck')) {

			if(msgSent.includes('say fuck')) {
				message.channel.send("No way, man! What if my ma hears?!")
			} else {
				message.channel.send("Hey, man! Language!")
			}
		
		} else if(checkForKeyword(msgSent, phantomThieves)) {

			var personMentioned = getKeywordResponse(msgSent, phantomThieves)
			console.log(personMentioned)
			var randomPersonResponse = uniqueRandomArray(people[personMentioned])
			message.channel.send(randomPersonResponse()) 

		} else if (checkForKeyword(msgSent, specificResponseKeywords)) {
			var keywordMentioned = getKeywordResponse(msgSent, specificResponseKeywords)
			console.log(keywordMentioned)
			var randomKeywordResponse = uniqueRandomArray(specific[keywordMentioned])
			message.channel.send(randomKeywordResponse()) 

		} else if(checkForKeyword(msgSent, foodKeywords)) {
			var foodResponse = uniqueRandomArray(specific['food'])
			message.channel.send(foodResponse())

		} else if(checkForKeyword(msgSent, sleepKeywords)) {

			message.channel.send(specific['sleep'])

		} else if (checkForKeyword(msgSent, complimentsKeywords)) {

			var complimentsRespose = uniqueRandomArray(specific['compliment'])
			message.channel.send(complimentsRespose())

		} else if (checkForKeyword(msgSent, foodKeywords)) {

			var foodRespose = uniqueRandomArray(specific['food'])
			message.channel.send(foodRespose)
		}
		else if (msgSent.includes('dog fact')) {

			message.channel.send(generateDogFact())

		//Default random banter 	
		} else {
			message.channel.send(getRandomMessage(random))
		}
	}
})

//I'm tired factor this logic out when not tired 
function checkForKeyword(msg, keywordArr) {
	var msgArr = msg.split(" ")
	var keywords = msgArr.filter( word => 
		-1 !== keywordArr.indexOf(word))
	return keywords.length > 0 
}

function getKeywordResponse(msg, keywordJSON) {
	var msgArr = msg.split(" ")
	var keywords = msgArr.filter( word => 
		-1 !== keywordJSON.indexOf(word))

	//If multiple keywords, pick randomly from array
	var keywordMentionedResponse = uniqueRandomArray(keywords)
	return keywordMentionedResponse()
}

function getPersonMentioned(msg) {
	var msgArr = msg.split(" ")
	var people = msgArr.filter( word => 
		-1 !== phantomThieves.indexOf(word))

	//If multiple people, pick randomly from array
	var personMentioned = uniqueRandomArray(people)
	return personMentioned()
}

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
