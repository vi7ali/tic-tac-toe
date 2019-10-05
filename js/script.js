function render() {
    const gridCells = document.getElementsByClassName('grid__content');
    
    for(let gridCell of gridCells) {
        gridCell.textContent = 'Q';        
    }
}

render();