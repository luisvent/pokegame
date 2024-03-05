
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomColor = () => {
  const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

  let hexColorRep = "#";

  for (let index = 0; index < 6; index++){
    const randomPosition = Math.floor ( Math.random() * hexCharacters.length )
    hexColorRep += hexCharacters[ randomPosition ]
  }

  return hexColorRep
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const replaceRandomStringChar = (text, replace, r) => {

  const replacements = {
    min: 0.7,
    max: 0.4
  }

  return text.split("").map(char => Math.random() > (r? (replacements[r]) : 0.5) ? replace : char).join("");
}

export default { getRandomNumber, shuffleArray, replaceRandomStringChar }
