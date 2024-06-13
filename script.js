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

const winningConditionsPlayerOne = [
  ['1x', '2x', '3x'],
  ['1x', '4x', '7x'],
  ['1x', '5x', '9x'],
  ['2x', '5x', '8x'],
  ['3x', '5x', '7x'],
  ['3x', '6x', '9x'],
  ['4x', '5x', '6x'],
  ['7x', '8x', '9x']
]

const winningConditionsPlayerTwo = [
  ['1o', '2o', '3o'],
  ['1o', '4o', '7o'],
  ['1o', '5o', '9o'],
  ['2o', '5o', '8o'],
  ['3o', '5o', '7o'],
  ['3o', '6o', '9o'],
  ['4o', '5o', '6o'],
  ['7o', '8o', '9o']
]

let roundNumber = 0;
let turn = 1;

const gameboard = (function () {
  const gameboardArray = [];
  let index = 0;
  const rows = 3,
    columns = 3;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      gameboardArray.push(++index);
    }
  }

  return {
    gameboardArray,
  };
})();

console.log(gameboard.gameboardArray);

const players = (function () {
  const playerOne = playerInvocation();
  const playerTwo = playerInvocation();
  return {
    playerOne,
    playerTwo,
  };
})();

console.log(players);

function playerInvocation() {
  return {
    turn: "",
    score: "",
    chancesPlayed: "",
    firstMoveTurn: "",
  };
}

function playRound(playerTurn, character){
  let chance = Number(prompt(`Player ${playerTurn}: `));
  gameboard.gameboardArray[chance-1] = `${chance}${character}`;

  console.log(chance, character);
  return;
};

function togglePlayerTurn(turn){
  console.log("Turn = ", turn)
  if(turn == 1) return 2;
  else if(turn == 2) return 1;
}

function matchConditions(player){
  
}

function checkForWin(){

  console.log("\nInside Check For Win.\n");

  if (matchConditions(1)) return 1;
  else if (winningConditionsPlayerTwo.forEach((conditions) => (gameboard.gameboardArray.find(conditions)))) return 2;
  else playGame();
}

function playGame(){
  roundNumber++;
  console.log("Round No. = ", roundNumber);

  let character;

  if(turn == 1) character = 'x';
  else if(turn ==2) character = 'o';

  playRound(turn, character);

  turn = togglePlayerTurn(turn);
  console.log("Turn = ", turn);

  let winCondition = checkForWin();

  if(winCondition) return winnerDisplay(winCondition);
  else{
    console.log('ERROR IN ELSE CONDITION OF PLAY GAME');
  }
}

playGame();