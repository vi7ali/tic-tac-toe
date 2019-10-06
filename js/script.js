'use strict'

function changeContent(e) {
    let target = e.target;
    target.textContent = 'Y';
    target.classList.remove('grid__cell--hidden');    
}

function restartGame() {
    document.getElementById('intro-screen').classList.remove('intro-screen--hide');
    const gridCells = document.getElementsByClassName('grid__cell');
    for(let gridCell of gridCells) {
        gridCell.textContent = 'Q';
        gridCell.classList.add('grid__cell--hidden');        
    }
}

function render() {
    const restartBtn = document.getElementById('restart');
    const playBtn = document.getElementById('play-btn');    
    const gridCells = document.getElementsByClassName('grid__cell');

    restartBtn.addEventListener('click', restartGame, false);
    playBtn.addEventListener('click', 
                            () => document.getElementById('intro-screen').classList.add('intro-screen--hide'), 
                            false);

    for(let gridCell of gridCells) {
        gridCell.textContent = 'Q';
        gridCell.addEventListener('click', changeContent, false);
    }
}


render();