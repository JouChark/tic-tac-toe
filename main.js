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
    }

    return {players, changeName}
})();

const playGame = (() => {

    createGameBoard.displayGameBoard();
    createGameBoard.createdArray();

    getPlayers.players()

    let p = document.getElementById('p')

    function play() {
        changeMode()
        restartGame()
        main.addEventListener('click', (e) => {
            let id = e.target.id;
            playRound(id);
            displayMark(id);
        }) 
    }

    function changeMode() {
        const placeholderText = document.getElementById('player2')
        const playerMode = document.getElementById('playerMode')
        playerMode.addEventListener('change', function() {
            if(this.value === '1') {
                placeholderText.placeholder = 'IA'
                placeholderText.disabled = true
                placeholderText.value = 'IA'
            } else if (this.value === '2') {
                placeholderText.placeholder = 'Player 2'
                placeholderText.value = 'Player 2'
                placeholderText.disabled = false
            }
            getPlayers.changeName()
            player1.win = false
            changeTextContent()
            resetBoard()
        })
    }

    let turn = 0;

    function playRound(id) {
        if (player2.name === 'IA' && turn < 9) {
                if (turn % 2 === 0) {
                    playerTurn(id, player1.mark)
                }
                if (turn % 2 !== 0) {
                    setTimeout(iaTurn, 500)
                }
        } else {
            if (!player1.win && turn < 10) {
                if (turn % 2 === 0) {
                    playerTurn(id, player1.mark)
                } 
                if (turn % 2 !== 0) {
                    playerTurn(id, player2.mark)
                }
            } else if (player1.win && turn < 10) {
                if (turn % 2 !== 0) {
                    playerTurn(id, player1.mark)
                } 
                if (turn % 2 === 0) {
                    playerTurn(id, player2.mark)
                }
            }
        }
    }

    function playerTurn(id, mark) {
        if (gameBoard[id] === null) {
            gameBoard.splice(id, 1, mark);
            turn++;
        }
        getWinner();
    }

    function iaTurn() {
        if (turn < 9) {
            let result = false
            while (!result) {
                let iaPlay = Math.floor(Math.random() * 9)
                if (gameBoard[iaPlay] === null) {
                    gameBoard.splice(iaPlay, 1, 'O');
                    result = true
                    turn++
                } else {
                    result = false
                }
                displayMark(iaPlay)
                getWinner();
            }
        }
    }

    function displayMark(id) {
        let cell = document.getElementById(id);
        cell.textContent = gameBoard[id];
    }

    function getWinner() {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        
        winCondition.forEach((el) => {
            let resultX = 0;
            let resultY = 0;
            el.forEach((e) => {
                if (gameBoard[e] === 'X') {
                    resultX += 1;
                } 
                if (gameBoard[e] === 'O') {
                    resultY +=1;
                }
            })
            if (resultX === 3) {
                p.textContent = `${player1.name} wins!`;
                player1.win = true;
                turn = 10
            } 
            if (resultY === 3) {
                p.textContent = `${player2.name} wins!`;
                player1.win = false;
                turn = 10
            } 
            if (turn === 9) {
                p.textContent = `It's a draw!`;
            }
        })
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
        if (player2.name === "IA") {
            p.textContent = `${player1.name} starts!`
        } else {
            if (player1.win) {
                p.textContent = `${player2.name} starts!`
            } else if (!player1.win) {
                p.textContent = `${player1.name} starts!`
            }
        }
    }

    window.onload = () => {
            document.getElementById('form').reset()
    }

    return {play}
})()

playGame.play()

