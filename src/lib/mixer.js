
let score = null;
let win = null;
let lose = null;
let wrong = null;
let intro = null;
let click = null;
let matchgame = null;


const loadAudio = (src) => {
  return new Audio(src);
}

const init = () => {
  score = loadAudio('/sounds/fx/score2.ogg');
  lose = loadAudio('/sounds/fx/game_over.ogg');
  wrong = loadAudio('/sounds/fx/lose.ogg');
  click = loadAudio('/sounds/fx/click.ogg');
  win = loadAudio('/sounds/fx/win.ogg');
  intro = loadAudio('/sounds/music/Fallarbor_Town.mp3');
  matchgame = loadAudio('/sounds/music/pikachu_beach.ogg');
}

const playScore = async () => {
  score.load()
  score.play()
}

const playLose = async () => {
  lose.load()
  lose.play()
}

const playWrong = async () => {
  wrong.load()
  wrong.play()
}

const playWin = async () => {
  win.load()
  win.play()
}

const playClick = async () => {
  click.load()
  click.play()
}

const playIntroMusic = () => {
  intro.load();
  intro.play();
  intro.loop = true;
}

const stopIntroMusic = () => {
  console.log(intro);
  intro.pause();
}

const playMatchGame = () => {
  matchgame.load();
  matchgame.play();
  matchgame.loop = true;
}

const stopMatchGame = () => {
  matchgame.pause();
}

export default { playScore, playLose, playWrong, playWin, playIntroMusic, stopIntroMusic, playMatchGame, stopMatchGame, playClick, init }
