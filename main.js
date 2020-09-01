const createGameBoard = (() => {

    const createdArray = () => {
        gameBoard = [null, null, null,
                     null, null, null,
                     null, null, null]
    } 

    const displayGameBoard = () => {
        const main = document.getElementById('main')
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.className = 'cell';
            div.id = i;
            main.appendChild(div);
        }
    }

    return {createdArray, displayGameBoard}
})();

const playGame = (() => {

    createGameBoard.displayGameBoard()
    createGameBoard.createdArray()
    
    let player1 = 'X'
    let player2 = 'O'
    let turn = 0

    const play = () => {
        main.addEventListener('click', (e) => {
            let id = e.target.id;
            playRound(id);
            displayMark(id);
        })
    }

    const playRound = (id) => {
        if (turn % 2 === 0 && gameBoard[id] === null) {
            gameBoard.splice(id, 1, player1)
            turn++
        } 
        if (turn % 2 !== 0 && gameBoard[id] === null) {
            gameBoard.splice(id, 1, player2)
            turn++
        }
    }

    const displayMark = (id) => {
        let cell = document.getElementById(id)
        cell.textContent = gameBoard[id]
    }
    
    return {play}
})()

playGame.play()

