//https://rossclay.github.io/odin-tic-tac-toe/

// function gameBoard() {
//     const rows = 3;
//     const columns = 3;
//     const gameBoardArray = [];

//     for(let i = 0; i < rows; i++){
//         gameBoardArray[i] = [];
//         for(let j = 0; j < columns; j++){
//             gameBoardArray[i].push(0);
//         }
//     }
//     console.log(gameBoardArray);
// }

// function Block() {
//     const value = 0;

//     const addToken = (player) => {
//         value = player;
//     };

//     const getValue = () => value;

//     return {
//         addToken, 
//         getValue,
//     };
// }

// gameBoard();

const gameboard = (function () {
    const gameboardArray = [];
    let index = 0;
    const rows = 3, columns = 3;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            gameboardArray.push(++index);
        }
    }
    console.log(gameboardArray);
})();

