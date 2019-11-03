'use strict'

function changeContent(e) {
    let target = e.target;
    target.textContent = 'Y';
    target.classList.remove('grid__cell--hidden');    
}

function restartGame() {
    fadeIn();    
    const gridCells = document.getElementsByClassName('grid__cell');
    for(let gridCell of gridCells) {
        gridCell.textContent = 'Q';
        gridCell.classList.add('grid__cell--hidden');        
    }
}

function fadeOut() {
    let playBtn = document.getElementById('play-btn');    
    let introScreen = document.getElementById('intro-screen');
    playBtn.style.display = 'none';
    introScreen.classList.toggle('intro-screen--hidden');
    setTimeout(function(){
        introScreen.style.display = 'none';
    }, 1000);
}

function fadeIn() {
    let introScreen = document.getElementById('intro-screen');
    let playBtn = document.getElementById('play-btn');  
    playBtn.style.display = 'block';  
    introScreen.style.display = 'block';     
    setTimeout(function(){
        introScreen.classList.toggle('intro-screen--hidden');
    }, 200);
}

function render() {
    const restartBtn = document.getElementById('restart');
    const playBtn = document.getElementById('play-btn');    
    const gridCells = document.getElementsByClassName('grid__cell');

    restartBtn.addEventListener('click', restartGame, false);
    playBtn.addEventListener('click', fadeOut, false);

    for(let gridCell of gridCells) {
        gridCell.textContent = 'Q';
        gridCell.addEventListener('click', changeContent, false);
    }
}


render();