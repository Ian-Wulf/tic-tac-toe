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

    const getBoard = () => board;
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
    return {getBoard, validSpace, placeMarker, clear, printBoard};
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


    const checkDirection = (flatBoard, index, offset) => {
        let playerMarker = flatBoard[index];
        let cellsToCheck = board.getBoard().length;
        let cellsChecked = 1;

        if(playerMarker === "") {
            return false;
        }

        while(flatBoard[index += offset] === playerMarker) {
            cellsChecked++;

            if(cellsChecked >= cellsToCheck) {
                return true; // Win found
            }
        }

        return false; // No win found

    };

    const checkWin = () => {
        const flatBoard = board.getBoard().flat();

        // Checking rows & columns
        for(let i = 0; i < board.getBoard().length; i++) {
            // Rows
            if(checkDirection(flatBoard, i * board.getBoard().length, 1)) {
                return true;
            }
            // Columns
            if(checkDirection(flatBoard, i, 3)) {
                return true;
            }
        }

        // Checking diagonals
        if(checkDirection(flatBoard, 0, 4)) {
            return true;
        }

        if(checkDirection(flatBoard, board.getBoard().length - 1, 2)) {
            return true;
        }

        return false; // No win found in any direction

    };

    const availableSquares = () => {
        let available = board.getBoard().flat().filter(square => square === "");
        if(available.length > 0) {
            return true;
        }

        return false;
    }

    const playRound = (row, col) => {
        console.log(`${getActivePlayer().name} chose square at [${row}, ${col}]`);

        if (!board.validSpace(row, col)) {
            console.log("Invalid space! Choose an empty square!")
            return;
        }

        board.placeMarker(row, col, getActivePlayer().marker);

        // Logic for detecting game win and declaring winner
        // + concluding and resetting game
        if(checkWin()) {
            // Declare winner and reset game
            console.log(`${getActivePlayer().name} wins!
                         Starting new game...`);
            board.clear();
            return;
        }

        // Checked for winner and board is full; thus tie
        if(!availableSquares()) {
            // Declare tie and reset game
            console.log(`It's a tie!
                         Starting new game...`);
            board.clear();
            return;
        }

        switchTurn();
        printRound();
    }

    return {getActivePlayer, playRound, board};
}

