// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt(word) {
  word= "";
   console.log("Let's play some scrabble! ");
      word = input.question("Enter a word: ");

      return word;
};

function simpleScorer(word){
word = word.toUpperCase();
let letterPoints = word.length;

return letterPoints;
};

const vowelBonusPoints ={
  1: ['B', 'C' , 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'],
  3: ['A', 'E', 'I', 'O', 'U']
}

function vowelBonusScorer(word){
  word = word.toUpperCase();
  let letterPoints= [];
  let sum = 0;

  for (let i =0; i < word.length; i++) {

    for (const pointValue in vowelBonusPoints){
      
      if (vowelBonusPoints[pointValue].includes(word[i])){
        letterPoints.push(pointValue);
        
        let letterPointsNum = Number(letterPoints[i]);

        sum += letterPointsNum;
      }
    }

  }
  return sum; 
};

let scrabbleScorer = function (word){
  let sum = 0
  
  for (let i = 0; i < word.length; i++){
    sum += newPointStructure[word[i].toLowerCase()];
  };
  return sum;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter worth 1 point",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble Score",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  console.log("What scoring method would you like to use?");
  for (let i = 0; i < scoringAlgorithms.length; i++){
    let option = scoringAlgorithms[i];
    console.log(i + "-" + option.name + ": " + option.description );
  }
  let method = Number(input.question("Enter 0, 1, or 2: "));
  return scoringAlgorithms[method];
}
function transform(oldPointStructure) {
  let newPoints = {}

  for (let keys in oldPointStructure) {
    let newKey = oldPointStructure[keys];

    for (let i = 0; i < newKey.length; i++) {
      newPoints[newKey[i].toLowerCase()] = Number(keys);
    };
  };
  return newPoints;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word= initialPrompt();
  let scorer = scorerPrompt().scorerFunction;
  let score = scorer(word);
  console.log(`Score for '${word}': ${score}\n`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
