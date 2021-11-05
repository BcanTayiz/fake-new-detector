const csv = require('csv-parser')
const fs = require('fs')
const brain = require('brain.js')
var natural = require('natural');
const results = [];



// create the network 
var classifier = new natural.BayesClassifier();

let addData = true
if (fs.existsSync('./classifier.json')) {
    console.log("Classifier is loaded")
    natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
        
        let category = classifier.classify("Tigers seem innocent but the cat was very strong with its motivation and the technique and its learned martial arts. Cat used its knife and danger cries to destroy its enemy in a war battle that the tiger even couldn't resist")
    
        console.log("Trained ML Neural Network")
        console.log(category)
    }); 
}else{
   console.log('err')
   fs.createReadStream('train.csv')
   .pipe(csv())
   .on('data', (data) => results.push(data))
   .on('end', () => {
     console.log('data installed and apply model is starting')
     applyModel()
     // [
     //   { NAME: 'Daffy Duck', AGE: '24' },
     //   { NAME: 'Bugs Bunny', AGE: '22' }
     // ]
   });
}


async function applyModel(){
    console.log('applyModel started')
    
    results.forEach(item => {
    
        classifier.addDocument(String(item['text'].split('\n').join(' ')),Number(item['label']))
    })
    console.log('network starts to train')
    classifier.train();
    // Save network state to JSON file.
    console.log(classifier.classify('i am short silver'),"classification result")
    classifier.save('classifier.json', function(err, classifier) {
        // the classifier is saved to the classifier.json file!
        if(err){
            console.log(err)
        }
    });

    // see the result from trained network
    let category = classifier.classify("Tigers seem innocent but the cat was very strong with its motivation and the technique and its learned martial arts. Cat used its knife and danger cries to destroy its enemy in a war battle that the tiger even couldn't resist")

    console.log("New Trained Neural Network")
    console.log(category)
}


function checkFakeNews(string){
    classifier.classify(string)
}

module.exports = checkFakeNews








