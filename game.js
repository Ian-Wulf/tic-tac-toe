// Game Board (IIFE)
function Gameboard() {
    // Board parameters
    const rows = 3;
    const cols = 3;
    const board = [];

    // Generate board
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < cols; j++) {
            board[i][j] = "";
        }
    }
    // Check if space is valid
    const validSpace = (row, col) => (board[row][col] === "") ? true : false;

    // Place marker
    const placeMarker = (row, col, marker) => board[row][col] = marker;

    // Clear board by emptying all squares of markers
    const clear = function() {
        board.forEach(row => row.fill(""));
    };

    // NOTE: Remove after implementing UI
    const printBoard = () => console.log(board);

    // Export 
    return {validSpace, placeMarker, clear, printBoard};
}

// Game
function GameController(p1Name = "Player One", p2Name = "Player Two") {
    // Get the board
    const board = Gameboard();

    // Make 2 players
    const players = [
        {name: p1Name, marker: 'X'},
        {name: p2Name, marker: 'O'}
    ];

    // For now, set active player to p1
    let activePlayer = players[0];

    // Switch turns
    const switchTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    // Retrieve active player
    const getActivePlayer = () => activePlayer;

    const printRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }; 

    const playRound = (row, col) => {
        console.log(`${getActivePlayer().name} chose square at [${row}, ${col}]`);

        if (!board.validSpace(row, col)) {
            console.log("Invalid space! Choose an empty square!")
            return;
        }

        board.placeMarker(row, col, getActivePlayer().marker);

        // Logic for detecting game win and declaring winner
        // + concluding and resetting game

        switchTurn();
        printRound();
    }

    return {getActivePlayer, playRound};
}

