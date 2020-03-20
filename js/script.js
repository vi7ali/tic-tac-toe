'use strict'
const PlayerFactory = (name, mark) => {
  let playerName = name;

  if (!playerName)
    playerName = mark === 'X' ? 'Player 1' : 'Player 2';

  const sayHello = () => console.log(`Hi, my name is ${playerName}, mark - ${mark}`);

  return {
    playerName,
    sayHello,
    mark
  }
}

const gameUI = (() => {
  // Private        
  const playBtn = document.getElementById('play-btn');
  const introScreen = document.getElementById('intro-screen');
  //Public
  const fadeIn = () => {
    playBtn.style.display = 'block';
    introScreen.style.display = 'block';
    setTimeout(function() {
      introScreen.classList.toggle('intro-screen--hidden');
    }, 200);
  }

  const fadeOut = () => {
    playBtn.style.display = 'none';
    introScreen.classList.toggle('intro-screen--hidden');
    setTimeout(function() {
      introScreen.style.display = 'none';
    }, 1000);
  }

  return {
    fadeIn,
    fadeOut
  };
})();

const gameLogic = (() => {
  const gridCells = document.getElementsByClassName('grid__cell');
  let player1;
  let player2;
  let currentPlayer;
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const addListeners = () => {
    for (let gridCell of gridCells)
      gridCell.addEventListener('click', makeMove, false);
  }

  const removeListeners = () => {
    for (let gridCell of gridCells)
      gridCell.removeEventListener('click', makeMove, false);
  }

  const newGame = () => {
    let name1 = document.getElementById('player1-name').value;
    let name2 = document.getElementById('player2-name').value;
    player1 = PlayerFactory(name1, 'X');
    player2 = PlayerFactory(name2, 'O');
    currentPlayer = player1;    
    gameUI.fadeOut();
    addListeners();
  }

  const restartGame = (() => {
    for (let gridCell of gridCells)
      gridCell.textContent = '';
    gameUI.fadeIn();
    removeListeners();
  })

  const makeMove = e => {
    if (!e.target.innerText) {
      e.target.innerText = currentPlayer.mark;
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      currentPlayer.sayHello();
      checkWin();
    }
  }

  const checkWin = () => {
    let board = [];
    let gridCells = document.getElementsByClassName('grid__cell');
    for (let gridCell of gridCells)
      board.push(gridCell.innerText);
    // Remove the win combinations that have empty cells
    // And get the win combination by comparing cells + flat
    let winCondition = winConditions
      .filter(condition => board[condition[0]] && board[condition[1]] && board[condition[2]])
      .filter(win => board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]])
      .flat();
    // Tie case    
    if (!winCondition.length && !board.includes(''))
      endGame();
    // Win case
    if (winCondition.length) {
      endGame(board[winCondition[0]]);
    }
  }

  const endGame = (mark = false) => {
    removeListeners();
    if (mark) {
      let winner = player1.mark == mark ? player1 : player2;
      gameUI.displayWinner(winner);
    } else {
      gameUI.displayTie();
    }
  }

  return {
    newGame,
    restartGame
  }
})();

const gameFlow = (() => {
  const restartBtn = document.getElementById('restart');
  const playBtn = document.getElementById('play-btn');

  const init = () => {
    restartBtn.addEventListener('click', gameLogic.restartGame, false);
    playBtn.addEventListener('click', gameLogic.newGame, false);
  };

  return {
    init
  };
})();


gameFlow.init();
