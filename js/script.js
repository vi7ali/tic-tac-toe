'use strict'

const changeContent = e => {
    let target = e.target;
    target.textContent = 'Y';    
}

const gameUI = (() => {
    // Private        
    const playBtn = document.getElementById('play-btn');    
    const gridCells = document.getElementsByClassName('grid__cell');
    const introScreen = document.getElementById('intro-screen');
    const inputNames = document.getElementsByClassName('intro-screen__input');
    
    const fadeIn = () => {
        playBtn.style.display = 'block';  
        introScreen.style.display = 'block';     
        setTimeout(function(){
            introScreen.classList.toggle('intro-screen--hidden');
        }, 200);
    }

    const fadeOut = () => {
        playBtn.style.display = 'none';
        introScreen.classList.toggle('intro-screen--hidden');
        setTimeout(function(){
            introScreen.style.display = 'none';
        }, 1000);
    }
    //Public
    const redrawUI = (opt) => {
        for(let gridCell of gridCells) 
            gridCell.textContent = '';

        for(let input of inputNames)
            input.value = '';
        console.log(opt.newGame);
        opt.newGame ? fadeOut() : fadeIn();
    }

    return { redrawUI }
})();

const gameFlow = (() => {
    const restartBtn = document.getElementById('restart');
    const playBtn = document.getElementById('play-btn');    
    // const gridCells = document.getElementsByClassName('grid__cell');

    restartBtn.addEventListener('click', gameUI.redrawUI.bind(this, {newGame: false}), false);
    playBtn.addEventListener('click', gameUI.redrawUI.bind(this, {newGame: true}), false);           
    // gridCell.addEventListener('click', changeContent, false);
    
    // const init = () => gameUI.redrawUI({newGame: true});
    
    // return {init}
})();


// gameFlow.init();