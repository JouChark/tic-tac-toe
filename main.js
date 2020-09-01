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

const getPlayers = (() => {
    const player = (name, mark, win) => {
        return {name, mark, win}
    }

    const submitPlayer = () => {
        const submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', function() {
            getName()
            createPlayer()
            document.getElementById('p').textContent = `${player1.name}`
            if (name1 !== '' && name2 !== '') {
                resetForm()
            }
            return false
        })
    }

    const createPlayer = () => {
        player1 = player(name1, 'X', false)
        player2 = player(name2, 'O', false) 
    }
    
    const getName = () => {
        name1 = document.getElementById('player1').value
        name2 = document.getElementById('player2').value
    }
    

    function resetForm() {
        document.getElementById('form').reset()
    }

    return {submitPlayer}
})();

const playGame = (() => {

    createGameBoard.displayGameBoard();
    createGameBoard.createdArray();

    getPlayers.submitPlayer()

    let p = document.getElementById('p')

    let turn = 0;

    const play = () => {
        main.addEventListener('click', (e) => {
            if (turn >= 0 || turn < 9) {
                let id = e.target.id;
                playRound(id);
                displayMark(id);
                getWinner();
                resetBoard()
            } 
        })
    }

    const playRound = (id) => {
        if (player1.name !== '' && player2.name !== '' && turn < 9) {
            if (turn % 2 === 0 && gameBoard[id] === null) {
                gameBoard.splice(id, 1, player1.mark);
                p.textContent = `${player2.name}`
                turn++;
            } 
            if (turn % 2 !== 0 && gameBoard[id] === null && turn < 9) {
                gameBoard.splice(id, 1, player2.mark);
                p.textContent = `${player1.name}`
                turn++;
            }
        }
        
    }

    const displayMark = (id) => {
        let cell = document.getElementById(id);
        cell.textContent = gameBoard[id];
    }

    const getWinner = () => {
        if ((gameBoard[0] === 'X' && gameBoard[1] ==='X' && gameBoard[2] === 'X') ||
            (gameBoard[3] === 'X' && gameBoard[4] ==='X' && gameBoard[5] === 'X') ||
            (gameBoard[6] === 'X' && gameBoard[7] ==='X' && gameBoard[8] === 'X') ||
            (gameBoard[0] === 'X' && gameBoard[3] ==='X' && gameBoard[6] === 'X') ||
            (gameBoard[1] === 'X' && gameBoard[4] ==='X' && gameBoard[7] === 'X') ||
            (gameBoard[2] === 'X' && gameBoard[5] ==='X' && gameBoard[8] === 'X') ||
            (gameBoard[0] === 'X' && gameBoard[4] ==='X' && gameBoard[8] === 'X') ||
            (gameBoard[2] === 'X' && gameBoard[4] ==='X' && gameBoard[6] === 'X')) {
                p.textContent = `${player1.name} wins!`
                turn = 10
        } else if ((gameBoard[0] === 'O' && gameBoard[1] ==='O' && gameBoard[2] === 'O') ||
                   (gameBoard[3] === 'O' && gameBoard[4] ==='O' && gameBoard[5] === 'O') ||
                   (gameBoard[6] === 'O' && gameBoard[7] ==='O' && gameBoard[8] === 'O') ||
                   (gameBoard[0] === 'O' && gameBoard[3] ==='O' && gameBoard[6] === 'O') ||
                   (gameBoard[1] === 'O' && gameBoard[4] ==='O' && gameBoard[7] === 'O') ||
                   (gameBoard[2] === 'O' && gameBoard[5] ==='O' && gameBoard[8] === 'O') ||
                   (gameBoard[0] === 'O' && gameBoard[4] ==='O' && gameBoard[8] === 'O') ||
                   (gameBoard[2] === 'O' && gameBoard[4] ==='O' && gameBoard[6] === 'O')) {
                        p.textContent = `${player2.name} wins!`
                        turn = 10
    } else if (turn === 9) {
        p.textContent = `It's a draw!`
    }

    }

    const resetBoard = () => {
        let resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', () => {
            for (let i = 0; i < 9; i++) {
                let id = document.getElementById(i)
                main.removeChild(id)
            }
            createGameBoard.displayGameBoard();
            createGameBoard.createdArray();
            p.textContent = `${player1.name}`
            turn = 0
        })
        
    }

    return {play}
})()

playGame.play()

