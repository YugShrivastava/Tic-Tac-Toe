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
  ["1x", "2x", "3x"],
  ["1x", "4x", "7x"],
  ["1x", "5x", "9x"],
  ["2x", "5x", "8x"],
  ["3x", "5x", "7x"],
  ["3x", "6x", "9x"],
  ["4x", "5x", "6x"],
  ["7x", "8x", "9x"],
];

const winningConditionsPlayerTwo = [
  ["1o", "2o", "3o"],
  ["1o", "4o", "7o"],
  ["1o", "5o", "9o"],
  ["2o", "5o", "8o"],
  ["3o", "5o", "7o"],
  ["3o", "6o", "9o"],
  ["4o", "5o", "6o"],
  ["7o", "8o", "9o"],
];

let roundNumber = 0,
  checkForWinFlag = 0,
  score1 = 0,
  score2 = 0;
let turn = 1;


const gridWrapper = document.querySelector(".gridWrapper");
const gridItems = document.querySelectorAll(".gridItems");
const dialog = document.querySelector("dialog");

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



const players = (function () {
  const playerOne = playerInvocation();
  const playerTwo = playerInvocation();
  return {
    playerOne,
    playerTwo,
  };
})();


function playerInvocation() {
  return {
    turn: "",
    score: "",
    chancesPlayed: "",
    firstMoveTurn: "",
  };
}

function playRound(playerTurn, character, chance) {
  if (gameboard.gameboardArray[chance - 1] == chance) {
    gameboard.gameboardArray[chance - 1] = `${chance}${character}`;
    return;
  } else {
    playRound(playerTurn, character);
  }
}

function togglePlayerTurn(turn) {
  if (turn == 1) return 2;
  else if (turn == 2) return 1;
}

function matchConditions(player) {
  let matches = 0,
    match = 0;
  if (player === 1) {
    winningConditionsPlayerOne.forEach((conditions) => {
      conditions.forEach((element) => {
        if (gameboard.gameboardArray.indexOf(element) >= 0) {
          matches++;
        } else matches = 0;
        if (matches === 3) match++;
      });
      matches = 0;
    });
  } else if (player === 2) {
    winningConditionsPlayerTwo.forEach((conditions) => {
      conditions.forEach((element) => {
        if (gameboard.gameboardArray.indexOf(element) >= 0) {
          matches++;
        } else matches = 0;
        if (matches === 3) match++;
      });
      matches = 0;
    });
  }

  if (match !== 0) return true;
  else return false;
}

function checkForWin() {

  if (matchConditions(1)) return 1;
  else if (matchConditions(2)) return 2;
  else {
    if (roundNumber === 9) {
      checkForWinFlag = 1;
      return false;
    }
  }
}

function replay(winner = undefined){
  if(winner !== undefined){
    turn = winner;
    if(winner == 1) score1++;
    else if(winner == 2) score2++;
    const h2 = document.querySelector("h2");
    h2.innerHTML = `Score X: ${score1}<br>Score O: ${score2}`;
  }

  const replay = document.querySelector("button")
  replay.addEventListener("click", () => {
    dialog.close();
    gridItems.forEach((Items) => {
      Items.innerHTML = "";
      winner = undefined;
      for(let i = 0; i < 9; i++){
        gameboard.gameboardArray[i] = i+1;
      }
    })
  })  

  roundNumber = 0;
}

function winnerDisplay(winnerPlayer) {
  turn = winnerPlayer;
  dialog.innerHTML = `<p>${winnerPlayer} Wins!!</p><button>Replay</button>`;
  dialog.showModal();
  replay(winnerPlayer);
}

function drawDisplay(){
  dialog.innerHTML = `<p>!Draw!</p><button>Replay</button>`;
  dialog.showModal();
  replay();
}

function playGame(chance) {
  roundNumber++;

  let character;

  if (turn == 1) character = "x";
  else if (turn == 2) character = "o";

  playRound(turn, character, chance);

  turn = togglePlayerTurn(turn);

  let winCondition = checkForWin();

  if (winCondition) return winnerDisplay(winCondition);
  if (roundNumber === 9 && checkForWinFlag === 1) {
    drawDisplay();
  }
}

// console.log(playGame());



gridItems.forEach((Items) => {
  Items.addEventListener("click", () => {
    if (Items.innerHTML) {
      alert("Oops! That place is already taken. Try another spot.");
    } 
    else {
      let chance = Items.getAttribute("id");

      if (turn == 1) Items.innerHTML = '<p id="XO">X</p>';
      else if (turn == 2) Items.innerHTML = '<p id="XO">O</p>';

      playGame(chance);
    }
  });
});
