'use strict'
const PlayerFactory = (name, mark) => {

  if (!name)
    name = mark === 'X' ? 'Player 1' : 'Player 2';

  return {
    name,    
    mark
  }
}

const GameUI = (() => {
  // Private        
  const playBtn = document.getElementById('play-btn');
  const introScreen = document.getElementById('intro-screen');
  const display = document.getElementById('display');
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

  const displayYourMove = player => display.innerText = `Your move, ${player.name}`;
  const displayTie = () => display.innerText = `It's a Tie`;

  const displayWinner = (player) => {
    display.innerText = `${player.name} Wins !!!`;
  }

  const toggleHighlight = (winCondition) => {
    for (let cell of winCondition) {
      document.getElementById(cell).classList.add('grid__cell--highlight');
    };
  }

  return {
    fadeIn,
    fadeOut,
    displayYourMove,
    displayTie,
    displayWinner,
    toggleHighlight
  };
})();

const GameLogic = (() => {
  //Private
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

  const makeMove = e => {
    if (!e.target.innerText) {
      e.target.innerText = currentPlayer.mark;      
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      checkWin();
    }
  }

  const checkWin = () => {
    let board = [];
    for (let gridCell of gridCells)
      board.push(gridCell.innerText);
    // Remove the win combinations that have empty cells
    // And get the win combination by comparing cells + flat
    let winCondition = winConditions
      .filter(condition => board[condition[0]] && board[condition[1]] && board[condition[2]])
      .filter(win => board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]])
      .flat();
    // Game ongoing
    if (!winCondition.length && board.includes(''))
      GameUI.displayYourMove(currentPlayer);
    // Tie case
    if (!winCondition.length && !board.includes(''))
      endGame();
    // Win case
    if (winCondition.length) {
      endGame(board[winCondition[0]], winCondition);
    }
  }

  const endGame = (mark = false, winCondition) => {
    removeListeners();
    if (mark) {
      let winner = player1.mark == mark ? player1 : player2;
      GameUI.toggleHighlight(winCondition)
      GameUI.displayWinner(winner);
    } else {
      GameUI.displayTie();
    }
  }
  //Public
  const newGame = () => {
    let name1 = document.getElementById('player1-name').value;
    let name2 = document.getElementById('player2-name').value;
    player1 = PlayerFactory(name1, 'X');
    player2 = PlayerFactory(name2, 'O');
    currentPlayer = player1;
    GameUI.fadeOut();
    GameUI.displayYourMove(currentPlayer)
    addListeners();
  }

  const restartGame = () => {
    for (let gridCell of gridCells) {
      gridCell.textContent = '';
      gridCell.classList.remove('grid__cell--highlight');
    }
    GameUI.fadeIn();
    removeListeners();
  }

  return {
    newGame,
    restartGame
  }
})();

document.getElementById('play-btn').addEventListener('click', GameLogic.newGame, false);
document.getElementById('restart').addEventListener('click', GameLogic.restartGame, false);