const csv = require('csv-parser')
const fs = require('fs')
const brain = require('brain.js')
var natural = require('natural');
const results = [];





if (fs.existsSync('./classifier.json')) {
    
    console.log("Classifier is loaded")
    natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
        
        function classifierML(string){
            let result = classifier.classify(string)
            return result
        }

        let result = classifierML(string)
        module.exports = classifierML
    }); 
}

    














