// Game Board (IIFE)
const gameBoard = (function () {
    const board = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];

    const getBoard = () => board;

    // Place marker
    const placeMarker = (row, col, marker) => (board[row][col] === "") ? board[row][col] = marker : board[row][col] = board[row][col];

    // Clear board by emptying all squares of markers
    const clear = function() {
        board.forEach(row => row.fill(""));
    };
    // 
    const printBoard = () => console.log(board);

    // Export 
    return {getBoard, placeMarker, clear, printBoard};
})();

// Player
function Player(name, marker, active) {
    return {name, marker, active};
}

// Game
function GameController() {

}

