const text = document.querySelector("#title");
const strategy = document.querySelector("#strategy");
const restartBtn = document.querySelector("#restart");
const SQUARE = document.querySelector("#board");
const startButton = document.querySelector(".startButton");
const targetSquare = document.querySelector(".disabled_square");
const tagWin = document.querySelector(".tagWin");
const playerWin = document.querySelector(".playerWin");
const winPlayerX = document.getElementById("player__symbol_X");
const winPlayer0 = document.getElementById("player__symbol_O");
var scoreX = 0;
var scoreO = 0;

// Function to enable the div
function enableSquare() {
  targetSquare.style.pointerEvents = "auto"; // Enable pointer events
  targetSquare.style.opacity = "1"; // Restore full opacity
}

// Add a click event listener to the button
startButton.addEventListener("click", function () {
  enableSquare();
});

const createBoard = (n) => {
  return [...Array(n)].map(() => Array(n).fill(null));
};

const board = createBoard(20);

const boardSize = 20;

for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("square");
    gridCell.dataset.row = i;
    gridCell.dataset.column = j;
    SQUARE.appendChild(gridCell);
  }
}

const squares = document.querySelectorAll(".square");
let currentPlayer = "X";

squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    const row = parseInt(square.dataset.row);
    const column = parseInt(square.dataset.column);

    handleCellClick(square);
  });
});

function handleCellClick(square) {
  const row = parseInt(square.dataset.row);
  const column = parseInt(square.dataset.column);
  if (!square.textContent) {
    square.textContent = currentPlayer;
    board[row][column] = currentPlayer;
    checkHorizontal(row, column, currentPlayer, board);
    checkVertical(row, column, currentPlayer, board);
    checkaathordimention1(row, column, currentPlayer, board);
    checkaathordimention2(row, column, currentPlayer, board);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkHorizontal(row, column, currentPlayer, board) {
  let counter = 0;

  for (let j = column; j >= 0; j--) {
    if (board[row][j] === currentPlayer) {
      counter++;
      console.log("this counter for horizontal -- " + counter);
    } else {
      break;
    }
  }

  for (let j = column + 1; j < board[row].length; j++) {
    if (board[row][j] === currentPlayer) {
      counter++;
      console.log("this counter for horizontal ++ " + counter);
    } else {
      break;
    }
  }
  if (counter >= 5) {
    WinningPlayer(currentPlayer);
  }
}

function checkVertical(row, column, currentPlayer, board) {
  let counter = 0;

  for (let j = row; j >= 0; j--) {
    if (board[j][column] === currentPlayer) {
      counter++;
    } else {
      break;
    }
  }

  // Check to the right
  for (let j = row + 1; j < board[row].length; j++) {
    if (board[j][column] === currentPlayer) {
      counter++;
    } else {
      break;
    }
  }

  if (counter >= 5) {
    WinningPlayer(currentPlayer);
  }
}

function checkaathordimention1(row, column, currentPlayer, board) {
  let counter = 0;
  // Check diagonal from bottom-left to top-right
  for (let i = row, j = column; i >= 0 && j < board[i].length; i--, j--) {
    if (board[i][j] === currentPlayer) {
      counter++;
      // console.log(counter);
    } else {
      break;
    }
  }

  // Check diagonal from top-left to bottom-right
  for (
    let i = row, j = column;
    i < board.length && j < board[i].length;
    i++, j++
  ) {
    if (board[i + 1][j + 1] === currentPlayer) {
      counter++;
      // console.log(counter);
    } else {
      break;
    }
  }

  if (counter >= 5) {
    WinningPlayer(currentPlayer);
  }
}

function checkaathordimention2(row, column, currentPlayer, board) {
  let counter = 0;

  for (let i = row, j = column; i < board[j].length && j >= 0; i++, j--) {
    // console.log(board[i].length);
    if (board[i][j] === currentPlayer) {
      counter++;
      // console.log(counter);
    } else {
      break;
    }
  }
  for (let i = row, j = column; i >= 0 && j <= board[i].length; i--, j++) {
    // console.log(board[i].length);
    if (board[i - 1][j + 1] === currentPlayer) {
      counter++;
      // console.log(counter);
    } else {
      break;
    }
  }

  if (counter >= 5) {
    WinningPlayer(currentPlayer);
  }
}

function WinningPlayer(currentPlayer) {
  console.log(currentPlayer);
  Swal.fire({
    position: "top-end",
    imageUrl:
      "https://img.freepik.com/free-vector/realistic-serpentine-background_52683-73157.jpg?size=626&ext=jpg&uid=R81020729&ga=GA1.1.2044282038.1678278481&semt=ais",
    imageWidth: 400,
    imageHeight: 400,
    showConfirmButton: false,
    title:
      "Congratulations to Player " + currentPlayer + " for winning the game.",
    timer: 3000,
  });

  if (currentPlayer === "X") {
    scoreX++;
    winPlayerX.textContent = scoreX;
  } else if (currentPlayer === "O") {
    scoreO++;
    winPlayer0.textContent = scoreO;
  }
  clearBoard();
}

function clearBoard() {
  squares.forEach((element) => {
    element.textContent = "";
  });

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = null;
    }
  }
}
