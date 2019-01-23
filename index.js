var auth = require('./auth.json')
var love = require('./love.json')
var random  = require('./random.json')
var motivational = require('./motivational.json')


const Discord = require('discord.js')
const ryuji = new Discord.Client()

ryuji.on('message', function(message) {
	if(!message.author.bot && message.content.includes('hey, ryuji!')) {
		console.log(message.author.tag)

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

		} else if (message.content.includes("fuck")) {
			
			message.channel.send("Hey, man! Language!")

		} else if(message.content.includes('delete')) {
			console.log(message.author.tag)

			message.channel.fetchMessages().then(collected => { //collected is a Collection
				collected.forEach(msg => {
					console.log(msg.content)
					console.log(msg.author.tag)
					console.log(msg.createdAt.getDate())
					if(msg.createdAt.getDate() == 21 && msg.author.tag != "notgodzilla#9593") msg.delete(); 
				})
			}).catch(console.error)

		}else {

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
