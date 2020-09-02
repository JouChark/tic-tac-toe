const createGameBoard = (() => {

    function createdArray() {
        gameBoard = [null, null, null,
                     null, null, null,
                     null, null, null]
    } 

    function displayGameBoard() {
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

    function players() {
        createPlayers()
    }

    function createPlayers() {
        player1 = player('Player 1', 'X', false)
        player2 = player('Player 2', 'O', false) 
    }
    
    function changeName() {
        player1.name = document.getElementById('player1').value
        player2.name = document.getElementById('player2').value
        if (player1.name === '') {
            player1.name = 'Player 1'
        }
        if (player2.name === '') {
            player2.name = 'Player 2'
        }
    }

    return {players, changeName}
})();

const playGame = (() => {

    createGameBoard.displayGameBoard();
    createGameBoard.createdArray();

    getPlayers.players()

    let p = document.getElementById('p')

    let turn = 0;

    function play() {
        createNewGame()
        restartGame()
        if (turn < 9) {
            main.addEventListener('click', (e) => {
                let id = e.target.id;
                playRound(id);
                displayMark(id);
                getWinner();
        })
        }    
    }

    function createNewGame() {
        changeForm()
        changeInputText()
        changePlayerMode()
    }

    function changeForm() {
        const newGame = document.getElementById('newGame')
        const form = document.getElementById('form')
        newGame.addEventListener('click', () => {
            if (form.className === 'hiddenForm') {
                form.className = 'showForm'
                p.style.display = 'none'
            } else {
                getPlayers.changeName()
                p.style.display = 'inherit'
                form.className = 'hiddenForm'
                p.textContent = `${player1.name} starts!`
            }
        })
    }

    function changePlayerMode() {
        const playerMode = document.getElementById('playerMode')
        playerMode.addEventListener('change', () => {
            resetBoard()
            getPlayers.changeName()
        })
    }

    function changeInputText() {
        const placeholderText = document.getElementById('player2')
        const playerMode = document.getElementById('playerMode')
        playerMode.addEventListener('change', function() {
            if(this.value === '1') {
                placeholderText.placeholder = 'IA'
                placeholderText.value = 'IA'
            } else if (this.value === '2') {
                placeholderText.placeholder = 'Player 2'
            }
        })
    }

    function playRound (id) {
        if (!player1.win && turn < 10) {
            document.getElementById('form').className = 'hiddenForm'
            if (turn % 2 === 0 && gameBoard[id] === null) {
                gameBoard.splice(id, 1, player1.mark);
                turn++;
            } 
            if (turn % 2 !== 0 && gameBoard[id] === null) {
                gameBoard.splice(id, 1, player2.mark);
                turn++;
            }
        } else if (player1 && turn < 10) {
            if (turn % 2 !== 0 && gameBoard[id] === null) {
                gameBoard.splice(id, 1, player1.mark);
                turn++;
            } 
            if (turn % 2 === 0 && gameBoard[id] === null) {
                gameBoard.splice(id, 1, player2.mark);
                turn++;
            }
        }
        
    }

    function displayMark(id) {
        let cell = document.getElementById(id);
        cell.textContent = gameBoard[id];
    }

    function getWinner() {
        if ((gameBoard[0] === 'X' && gameBoard[1] ==='X' && gameBoard[2] === 'X') ||
            (gameBoard[3] === 'X' && gameBoard[4] ==='X' && gameBoard[5] === 'X') ||
            (gameBoard[6] === 'X' && gameBoard[7] ==='X' && gameBoard[8] === 'X') ||
            (gameBoard[0] === 'X' && gameBoard[3] ==='X' && gameBoard[6] === 'X') ||
            (gameBoard[1] === 'X' && gameBoard[4] ==='X' && gameBoard[7] === 'X') ||
            (gameBoard[2] === 'X' && gameBoard[5] ==='X' && gameBoard[8] === 'X') ||
            (gameBoard[0] === 'X' && gameBoard[4] ==='X' && gameBoard[8] === 'X') ||
            (gameBoard[2] === 'X' && gameBoard[4] ==='X' && gameBoard[6] === 'X')) {
                p.textContent = `${player1.name} wins!`
                player1.win = true
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
                        player1.win = false
                        turn = 10
        } else if (turn === 9) {
            p.textContent = `It's a draw!`
        }
    }

    function restartGame() {
        let restart = document.getElementById('restart');
        restart.addEventListener('click', () => {  
            resetBoard()
            changeTextContent()
        }) 
    }

    function resetBoard() {
        for (let i = 0; i < 9; i++) {
            let id = document.getElementById(i)
            main.removeChild(id)
        }
        createGameBoard.displayGameBoard();
        createGameBoard.createdArray();
        turn = 0
    }

    function changeTextContent() {
        if (player1.win) {
            p.textContent = `${player2.name} starts!`
        } else if (!player1.win) {
            p.textContent = `${player1.name} starts!`
        }
    }

    window.onload = () => {
            document.getElementById('form').reset()
    }

    return {play}
})()

playGame.play()

