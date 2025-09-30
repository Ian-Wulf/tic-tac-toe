// Game Board (IIFE)
const gameBoard = (function () {
    const board = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];

    

    // Clear board by emptying all squares of markers
    const clear = function() {
        board.map(row => {
            return row.map(square => "");
        });
    };

    // Place marker
    const placeMarker = (row, col, marker) => (board[row][col] === "") ? board[row][col] = marker : board[row][col] = board[row][col];

    // Applicable functionalities to "export" from module
    return {clear, placeMarker};
})();

// Player
function player(name, marker) {
    return {name, marker};
}

// Game
function GameController() {

}