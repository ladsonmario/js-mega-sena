let state = {
    board: [],
    currentGame: [],
    savedGame: []
}

function start() {
    createBoard();
    newGame();        
}

function createBoard() {
    state.board = [];

    for(let i = 1; i <= 60; i++) {
        state.board.push(i);
    }
}

function newGame() {
    resetGame();
    render();

    console.log(state.currentGame);
}

function render() {
    renderBoard();
    renderButtons();
    renderSavedGames();
}

function renderBoard() {
    let divBoard = document.querySelector('#megasena-board');
    divBoard.innerHTML = '';
    
    let ulNumbers = document.createElement('ul');
    ulNumbers.classList.add('numbers');

    for(let i = 0; i < state.board.length; i++) {
        let currentNumber = state.board[i];
        
        let liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;
        liNumber.classList.add('number');

        liNumber.addEventListener('click', handleNumberClick);

        if(isNumberInGame(currentNumber)) {
            liNumber.classList.add('selected-number');
        }

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
    let value = Number(event.currentTarget.textContent);

    if(isNumberInGame(value)) {
        removeNumberFromGame(value);
    } else {
        addNumberToGame(value);
    }   

    console.log(state.currentGame);
    render();
}

function renderButtons() {
    let divButtons = document.querySelector('#megasena-buttons');
    divButtons.innerHTML = '';

    let buttonNewGame = createNewGameButton();
    let buttonRandomGame = createNewRandomButton();
    let buttonSaveGame = createNewSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
    let button = document.createElement('button');
    button.textContent = 'Novo jogo';

    button.addEventListener('click', newGame);

    return button;
}

function createNewRandomButton() {
    let button = document.createElement('button');
    button.textContent = 'Jogo aleatório';

    button.addEventListener('click', randomGame);

    return button;
}

function createNewSaveGameButton() {
    let button = document.createElement('button');
    button.textContent = 'Salvar jogo';
    button.disabled = !isGameComplete();
    button.style.cursor = !isGameComplete() ? 'not-allowed' : 'pointer';

    button.addEventListener('click', saveGame);

    return button;
}

function renderSavedGames() {
    let divSavedGames = document.querySelector('#megasena-saved-games');
    divSavedGames.innerHTML = '';

    if(state.savedGame.length === 0) {
        divSavedGames.innerHTML = '<p>Nenhum jogo salvo</p>';
    } else {
        let ulSavedGames = document.createElement('ul');

        for(let i = 0; i < state.savedGame.length; i++) {
            let currentNumber = state.savedGame[i];

            let liGame = document.createElement('li');

            liGame.textContent = currentNumber.join(', ');           
            ulSavedGames.appendChild(liGame);
        }

        divSavedGames.appendChild(ulSavedGames);
    }
}

function addNumberToGame(number) {
    if(number < 1 || number > 60) {
        console.error('Número invalido:', number);
        return;
    }

    if(state.currentGame.length >= 6) {
        console.error('O jogo já está completo!');
        return;
    }   

    if(isNumberInGame(number)) {
        console.error('Este número já está no jogo:', number);
        return;
    }

    state.currentGame.push(number);
}

function removeNumberFromGame(numberRemove) {
    // let newGame = [];
    // for(let i = 0; i < state.currentGame.length; i++) {
    //     let currentNumber = state.currentGame[i];

    //     if(currentNumber === numberRemove) {
    //         continue;
    //     }

    //     newGame.push(currentNumber);
    // }

    // state.currentGame = newGame;
    if(numberRemove < 1 || numberRemove > 60) {
        console.error('Número invalido:', numberRemove);
        return;
    }

    state.currentGame = state.currentGame.filter(item => item !== numberRemove);
}

function isNumberInGame(numberCheck) {
    // if(state.currentGame.includes(numberCheck)) {
    //     return true;
    // }

    // return false;
    return state.currentGame.includes(numberCheck);
}

function saveGame() {
    if(!isGameComplete()) {
        console.error('O jogo não está completo!');
    }

    state.savedGame.push(state.currentGame);
    newGame();

    console.log(state.savedGame);
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = [];
}

function randomGame() {
    resetGame();

    while(!isGameComplete()) {
        let randomNumber = Math.ceil(Math.random() * 60);
        addNumberToGame(randomNumber);
    }

    console.log(state.currentGame);

    render();
}

start();