
let score = null;
let win = null;
let lose = null;
let wrong = null;
let intro = null;
let click = null;
let matchgame = null;
let battlegame = null;
let identifygame = null;
let currentMusic = null;


const loadAudio = (src) => {
  return new Audio(src);
}

const init = () => {
  score = loadAudio('/sounds/fx/score2.ogg');
  lose = loadAudio('/sounds/fx/game_over.ogg');
  wrong = loadAudio('/sounds/fx/lose.ogg');
  click = loadAudio('/sounds/fx/click.ogg');
  win = loadAudio('/sounds/fx/win.ogg');
  intro = loadAudio('/sounds/music/fallarbor_town.ogg');
  matchgame = loadAudio('/sounds/music/pikachu_beach.ogg');
  battlegame = loadAudio('/sounds/music/classic_battle.ogg');
  identifygame = loadAudio('/sounds/music/pokemon_jump.ogg');
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
  currentMusic = 'intro';
}

const playBattleGameMusic = () => {
  battlegame.load();
  battlegame.play();
  battlegame.loop = true;
  currentMusic = 'battlegame';
}

const stopIntroMusic = () => {
  intro.pause();
}

const stopIdentifyMusic = () => {
  identifygame.pause();
}

const stopBattleGameMusic = () => {
  battlegame.pause();
}

const playMatchGame = () => {
  matchgame.load();
  matchgame.play();
  matchgame.loop = true;
  currentMusic = 'matchgame';
}

const playIdentifyGame = () => {
  identifygame.load();
  identifygame.play();
  identifygame.loop = true;
  currentMusic = 'identifygame';
}

const stopMatchGame = () => {
  matchgame.pause();
}

const playMusic = () => {
  if(currentMusic) {
    if(currentMusic === 'intro') {
      playIntroMusic();
    }

    if(currentMusic === 'matchgame') {
      playMatchGame();
    }

    if(currentMusic === 'identifygame') {
      playIdentifyGame();
    }

    if(currentMusic === 'battlegame') {
      playBattleGameMusic();
    }
  }
}

const stopMusic = () => {
  if(currentMusic) {
    if(currentMusic === 'intro') {
      stopIntroMusic();
    }

    if(currentMusic === 'matchgame') {
      stopMatchGame();
    }

    if(currentMusic === 'identifygame') {
      stopIdentifyMusic();
    }

    if(currentMusic === 'battlegame') {
      stopBattleGameMusic();
    }
  }
}

export default { stopIdentifyMusic, playIdentifyGame, playBattleGameMusic, stopBattleGameMusic, playMusic, stopMusic, playScore, playLose, playWrong, playWin, playIntroMusic, stopIntroMusic, playMatchGame, stopMatchGame, playClick, init }
