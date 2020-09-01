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

    let turn = 0;

    const play = () => {
        main.addEventListener('click', (e) => {
            let id = e.target.id;
            playRound(id);
            displayMark(id);
        })
    }

    const playRound = (id) => {
        if (player1.name !== '' && player2.name !== '') {
            if (turn % 2 === 0 && gameBoard[id] === null) {
                gameBoard.splice(id, 1, player1.mark);
                turn++;
            } 
            if (turn % 2 !== 0 && gameBoard[id] === null) {
                gameBoard.splice(id, 1, player2.mark);
                turn++;
            }
        }
        
    }

    const displayMark = (id) => {
        let cell = document.getElementById(id);
        cell.textContent = gameBoard[id];
    }
    
    return {play}
})()

playGame.play()

