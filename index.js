const auth = require('./auth.json')
const love = require('./love.json')
const random  = require('./random.json')
const motivational = require('./motivational.json')
const compliments = require('./compliments.json')
const specific  = require('./specificResponses.json')
const affection = require('./affection.json')
const goodbye = require('./goodbye.json')


const Broseiden = require('broseiden')
const Wonderful  = require('wonderful')
const uniqueRandomArray = require('unique-random-array')

const msgUtils = require('./msgUtils.js')
const Discord = require('discord.js')
const ryuji = new Discord.Client()



//const welcomeServerId = 533510779240972299 - welcome channel for actual server
const welcomeServerId = 537447847059259412 // welcome channel id for test server 

const foodKeywords = ['ramen', 'takoyaki','meat','beef bowl','beef','curry', 'food', 'eat']
const sleepKeywords = ['bed', 'sleep', 'bedtime']
const complimentsKeywords = ['cute', 'sexy', 'baby', 'hot', 'handsome']
const goodbyeKeywords = ['bye', 'goodbye', 'goodnight']
const affectionKeywords = Object.keys(affection)
const specificResponseKeywords = Object.keys(specific)

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

		msgSent = msgUtils.removePunctuation(msgSent)
		var msgKeywordArray = msgSent.split(" ")
	

		if(msgSent.includes('love')) {

			var wonderfulWord = Wonderful.random()
			var getLoveEmoji = msgUtils.trueOrFalse() ? "softryuji" : "ryujilovesyou"
			var loveEmoji = (message.guild.emojis.find(emoji => emoji.name == getLoveEmoji))
			message.react(loveEmoji)
			message.channel.send(`${msgUtils.getRandomMessage(love)} You're freakin' ${wonderfulWord}, man!`)


		} else if(msgSent.includes('depressed') || msgSent.includes('sad') || msgSent.includes('strength')) {

			//Randomizes compliments / motivational quotes
			if(msgUtils.trueOrFalse()) {

				var broWord = Broseiden()
				var wonderfulWord = Wonderful.random()
				var complimentSentence = msgUtils.getRandomMessage(compliments)
				var fullSentence = `Hey, ${broWord} ! Don't be sad. You're pretty ${wonderfulWord}! ${complimentSentence}`
				message.channel.send(fullSentence)

			} else {
				message.channel.send(msgUtils.getRandomMessage(motivational))
			}

		} else if (msgSent.includes('fuck')) {

			if(msgSent.includes('say fuck')) {
				message.channel.send("No way, man! What if my ma hears?!")
			} else {
				message.channel.send("Hey, man! Language!")
			}
		
		} else if (msgUtils.checkForKeyword(msgKeywordArray, specificResponseKeywords)) {

			var keywordMentioned = msgUtils.getKeywordResponse(msgKeywordArray, specificResponseKeywords)
			var randomKeywordResponse = uniqueRandomArray(specific[keywordMentioned])
			message.channel.send(randomKeywordResponse()) 

		} else if(msgUtils.checkForKeyword(msgKeywordArray, foodKeywords)) {

			var foodResponse = uniqueRandomArray(specific['food'])
			message.channel.send(foodResponse())

		} else if(msgUtils.checkForKeyword(msgKeywordArray, sleepKeywords)) {
	
			message.channel.send("Sleep?😂 I don't know that word😴 while you taking Z's 💤 I 🅱️ stealin' hearts ❤️🖤❤️U snooze you lose😤🤘Phantom 🃏Thieves 4 Life ☠️☠️☠️ SKULL ☠️☠️☠️")

		} else if (msgUtils.checkForKeyword(msgKeywordArray , complimentsKeywords)) {

			var complimentsRespose = uniqueRandomArray(specific['compliment'])
			message.channel.send(complimentsRespose())

		} else if (msgUtils.checkForKeyword(msgKeywordArray, foodKeywords)) {

			var foodRespose = uniqueRandomArray(specific['food'])
			message.channel.send(foodRespose())

		} else if(msgUtils.checkForKeyword(msgKeywordArray, affectionKeywords)) {

			var keywordMentioned = msgUtils.getKeywordResponse(msgKeywordArray, affectionKeywords)
			if(keywordMentioned == 'kiss') {
				message.react('💋')
			} else {
				var getAffectionEmoji = msgUtils.trueOrFalse() ? "softryuji" : "flowersforyuji"
				var affectionEmoji = (message.guild.emojis.find(emoji => emoji.name == getAffectionEmoji))
				message.react(affectionEmoji)
			}
			var affectionKeywordResponse = uniqueRandomArray(affection[keywordMentioned])
			message.channel.send(affectionKeywordResponse())

		} else if (msgSent.includes('phantom thieves')) {

			var phantomThievesResponse = uniqueRandomArray(specific['phantom'])
			message.channel.send(phantomThievesResponse())

		} else if (msgSent.includes('dog fact')) {

			message.channel.send(msgUtils.generateDogFact())

	
		} else if (msgUtils.checkForKeyword(msgKeywordArray, goodbyeKeywords)) {
			message.react('👋')
			message.channel.send(msgUtils.getRandomMessage(goodbye))

		//Default random banter 	
		} else {
			message.channel.send(msgUtils.getRandomMessage(random))
		}
	}
})


ryuji.login(auth.TOKEN)
