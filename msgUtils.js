const uniqueRandomArray = require('unique-random-array')
const DogFacts = require('dog-facts')

//I'm tired factor this logic out when not tired 
module.exports.checkForKeyword = (msgArr, keywordArr) => {
	var keywords = msgArr.filter( word => 
		-1 !== keywordArr.indexOf(word))
	return keywords.length > 0 
}

module.exports.getKeywordResponse = (msgArr, keywordJSON) =>  {
	var keywords = msgArr.filter( word => 
		-1 !== keywordJSON.indexOf(word))

	//If multiple keywords, pick randomly from array
	var keywordMentionedResponse = uniqueRandomArray(keywords)
	return keywordMentionedResponse()
}

module.exports.generateDogFact = () => {			
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

module.exports.trueOrFalse = () => {
	return Math.round(Math.random()) == 1 
}

module.exports.removePunctuation = (msg) =>  {
	return msg.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"")
}

module.exports.getRandomMessage = (messageSource) =>  {
	var randomMessage = uniqueRandomArray(messageSource)
	return randomMessage() 
}

