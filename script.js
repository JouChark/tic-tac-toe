const gameBoard = () => {
    const createBoard = () => {
        const gameBoard = [null, null, null,
                           null, null, null,
                           null, null, null]
        const main = document.getElementById('main')
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div')
            div.className = 'cell'
            div.id = i
            main.appendChild(div)
        }
    }
    return {createBoard}
}

let board = gameBoard()
board.createBoard()