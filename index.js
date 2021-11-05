const csv = require('csv-parser')
const fs = require('fs')
const brain = require('brain.js')
var natural = require('natural');
const results = [];



// create the network 
var classifier = new natural.BayesClassifier();

if (fs.existsSync('./classifier.json')) {
    console.log("Classifier is loaded")
    natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
        
        let category = classifier.classify("Tigers seem innocent but the cat was very strong with its motivation and the technique and its learned martial arts. Cat used its knife and danger cries to destroy its enemy in a war battle that the tiger even couldn't resist")
    
        console.log("Trained ML Neural Network")
        console.log(category)

        function checkFakeNews(string){
            let result = classifier.classify(string)
            return result
        }
        module.exports = checkFakeNews
    }); 
}












