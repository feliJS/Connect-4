
const players = [{ scoreBoard: document.querySelector("#player1-score-board") }, { scoreBoard: document.querySelector("#player2-score-board") }];
let selectedPlayer = 0;
let gameBoard = [/*[{DOM: }{DOM: }][{DOM: }{DOM: }][{DOM: }{DOM: }]*/];
const iconCurrentlySelectedDivDOM = document.querySelector("#player-icon-selected");
let winningArrayOfBoxes = []

function iconStylingsAndColors(imageSource) {
    if (imageSource.includes("dog")) {
        players[selectedPlayer].boxColor = "yellow";
        return "linear-gradient(133deg, rgba(36,34,0,1) 0%, rgba(89,88,8,1) 35%, rgba(176,182,31,1) 64%, rgba(213,211,164,1) 100%)"
    }
    if (imageSource.includes("bear")) {
        players[selectedPlayer].boxColor = "rosybrown";
        return "linear-gradient(133deg, rgba(36,0,0,1) 0%, rgba(89,47,8,1) 35%, rgba(182,114,31,1) 64%, rgba(213,178,164,1) 100%)"
    }
    if (imageSource.includes("fox")) {
        players[selectedPlayer].boxColor = "red";
        return "linear-gradient(133deg, rgba(36,0,0,1) 0%, rgba(89,8,8,1) 35%, rgba(182,31,31,1) 64%, rgba(213,164,164,1) 100%)"
    }

}

function iconSelector() {
    let iconBtns = document.querySelectorAll("#player-icon-section button");
    for (let i = 0; i < iconBtns.length; i++) {
        iconBtns[i].addEventListener("click", () => {
            for (let x = 0; x < iconBtns.length; x++) {
                iconBtns[x].querySelector("img").style.border = "none";
            }
            iconBtns[i].querySelector("img").style.border = "2px solid #d55e0f";
            iconBtns[i].querySelector("img").style.borderRadius = "8px";
            if (iconCurrentlySelectedDivDOM.innerHTML !== "") {
                iconCurrentlySelectedDivDOM.innerHTML = "";
            }
            const iconCurrentlySelectedPictureDOM = document.createElement("img");
            iconCurrentlySelectedPictureDOM.src = iconBtns[i].querySelector("img").src;
            iconCurrentlySelectedDivDOM.appendChild(iconCurrentlySelectedPictureDOM);
            players[selectedPlayer].icon = iconCurrentlySelectedPictureDOM;
            choosePlayerInfoSectionDOM.style.background = iconStylingsAndColors(iconBtns[i].querySelector("img").src);
        })
    }
}

function findEmptySpotRow(col) {
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i][col].value !== null) {
            return i - 1;
        }
    }
    return gameBoard.length - 1;
}
function checkWinnerVerti(currentCol) {
    for (let row = 0; row < gameBoard.length; row++) {
        if (gameBoard[row][currentCol].value == selectedPlayer) {
            winningArrayOfBoxes.push(gameBoard[row][currentCol].DOM)
        }
        else if (gameBoard[row][currentCol].value != selectedPlayer) {
            winningArrayOfBoxes = [];
        }
        if (winningArrayOfBoxes.length == 4) {
            break;
        }
    }
    return winningArrayOfBoxes
}
function checkWinnerHoriz(currentRow) {
    for (let col = 0; col < gameBoard[currentRow].length; col++) {
        if (gameBoard[currentRow][col].value == selectedPlayer) {
            winningArrayOfBoxes.push(gameBoard[currentRow][col].DOM)
        }
        else if (gameBoard[currentRow][col].value != selectedPlayer) {
            winningArrayOfBoxes = [];
        }
        if (winningArrayOfBoxes.length == 4) {
            break;
        }
    }
    return winningArrayOfBoxes
}
function checkWinnerDiag(currentCol, currentRow, op1, op2) {
    let previousBoxValue = selectedPlayer
    for (let jumpInGrid = 0; jumpInGrid <= 3; jumpInGrid++) {
        let jumpRow = op1 == "-" ? (currentRow - jumpInGrid) : (currentRow + jumpInGrid);
        let jumpCol = op2 == "-" ? (currentCol - jumpInGrid) : (currentCol + jumpInGrid);
        if (gameBoard[jumpRow] != undefined && gameBoard[jumpRow][jumpCol] != undefined) { // om det inte finns någon box (då är vi utanför gameBoard dvs undefined)
            let upDiagonallyBox = gameBoard[jumpRow][jumpCol];
            if (upDiagonallyBox.value == selectedPlayer) {
                if (previousBoxValue != selectedPlayer) { // om förra brickan är den andra spelaren så kan det inte bli 4 i rad samt om den sista är den andra spelaren så kan det fortfarande bli 4 i rad eftersom den sista inte räknas med men förra var selectedPlayer
                    winningArrayOfBoxes = [];
                } else {
                    winningArrayOfBoxes.push(upDiagonallyBox.DOM)
                }
            }
            previousBoxValue = upDiagonallyBox.value;
        }
    }
    previousBoxValue = selectedPlayer // reset to selectedPlayer again if it wasnt a streak / if last wasnt selected player
    for (let jumpInGrid = 1; jumpInGrid <= 3; jumpInGrid++) { // changed value to 1 because i dont want to check current box
        let jumpRow = op1 != "-" ? (currentRow - jumpInGrid) : (currentRow + jumpInGrid);
        let jumpCol = op2 != "-" ? (currentCol - jumpInGrid) : (currentCol + jumpInGrid);
        if (gameBoard[jumpRow] != undefined && gameBoard[jumpRow][jumpCol] != undefined) { // om det inte finns någon box (då är vi utanför gameBoard dvs undefined)
            let downDiagonallyBox = gameBoard[jumpRow][jumpCol];
            if (downDiagonallyBox.value == selectedPlayer) {
                if (previousBoxValue != selectedPlayer) { // om förra brickan är den andra spelaren så kan det inte bli 4 i rad samt om den sista är den andra spelaren så kan det fortfarande bli 4 i rad eftersom den sista inte räknas med men förra var selectedPlayer
                    winningArrayOfBoxes = [];
                } else {
                    winningArrayOfBoxes.push(downDiagonallyBox.DOM)
                }
            }
            previousBoxValue = downDiagonallyBox.value;
        }
    }
}


function outPutWinner() {
    winnerOutputDOM.textContent = "Winner is " + players[selectedPlayer].username;
    for (let i = 0; i < winningArrayOfBoxes.length; i++) {
        winningArrayOfBoxes[i].style.boxShadow = "0 0 15px 10px black";
        winningArrayOfBoxes[i].style.border = "2px solid black";
    }
    players[selectedPlayer].wins++;
    players[selectedPlayer].scoreBoard.querySelector("h3").textContent = players[selectedPlayer].wins;
    resetBtn.style.boxShadow = "0 0 15px 10px black";
}

function checkWinner(currentCol, currentRow) {
    winningArrayOfBoxes = []; // reset array before checking to make sure that its empty before the functions
    let horizWin = checkWinnerHoriz(currentRow)
    if (horizWin.length >= 4) {
        outPutWinner()
        return; //avsluta gå ej vidare
    }
    winningArrayOfBoxes = [];
    let vertiWin = checkWinnerVerti(currentCol)
    if (vertiWin.length >= 4) {
        outPutWinner()
        return;
    }
    winningArrayOfBoxes = [];
    checkWinnerDiag(currentCol, currentRow, "-", "+")
    if (winningArrayOfBoxes.length >= 4) {
        outPutWinner()
        return;
    }
    winningArrayOfBoxes = [];
    checkWinnerDiag(currentCol, currentRow, "-", "-")
    if (winningArrayOfBoxes.length >= 4) {
        outPutWinner()
        return;
    }
    console.log(winningArrayOfBoxes);
}

function checkDraw() {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let x = 0; x < gameBoard[i].length; x++) {
            if (gameBoard[i][x].value != null) {
                winnerOutputDOM.textContent = "Draw!";
            }
            else if (gameBoard[i][x].value == null) {
                winnerOutputDOM.textContent = "Game on!";
                return;
            }
        }
    }
}

function changeTurn(playerToChangeTo) {
    players[selectedPlayer].scoreBoard.style.boxShadow = "none";
    players[playerToChangeTo].scoreBoard.style.boxShadow = players[playerToChangeTo].boxColor + " 0 0 15px 10px";
    players[selectedPlayer].icon.style.border = "none";
    players[playerToChangeTo].icon.style.border = "2px solid " + players[playerToChangeTo].boxColor;
    players[selectedPlayer].icon.style.boxShadow = "none";
    players[playerToChangeTo].icon.style.boxShadow = "0 0 15px 10px black";
    selectedPlayer = playerToChangeTo;
}

function lockMode(otherPlayer) {
    players[otherPlayer].scoreBoard.style.boxShadow = "none";
    players[otherPlayer].icon.style.border = "none";
    players[otherPlayer].icon.style.boxShadow = "none";
    lockedBecauseSomeoneWon = true;
}

let lockedBecauseSomeoneWon = false;
function createGameBox() {
    const gameBoardDOM = document.querySelector("#game-board");
    const gameBoxDOM = document.createElement("div");
    gameBoxDOM.classList.add("game-box");
    gameBoxDOM.addEventListener('mouseover', hoverGameBox);
    gameBoxDOM.addEventListener('mouseout', hoverGameBox);
    gameBoxDOM.addEventListener('click', (e) => {
        if (lockedBecauseSomeoneWon == false) {
            const col = findCol(e.target);
            const row = findEmptySpotRow(col);
            gameBoard[row][col].value = selectedPlayer;
            checkDraw();
            checkWinner(col, row);
            if (selectedPlayer == 0) {
                gameBoard[row][col].DOM.style.backgroundColor = players[selectedPlayer].boxColor
                changeTurn(1);
                if (winningArrayOfBoxes.length >= 4) {
                    lockMode(1);
                }
            }
            else if (selectedPlayer == 1) {
                gameBoard[row][col].DOM.style.backgroundColor = players[selectedPlayer].boxColor
                changeTurn(0);
                if (winningArrayOfBoxes.length >= 4) {
                    lockMode(0);
                }
            }
        }
    });

    gameBoardDOM.appendChild(gameBoxDOM);
    return gameBoxDOM;
}

function findCol(boxDOM) {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let x = 0; x < gameBoard[i].length; x++) {
            if (gameBoard[i][x].DOM == boxDOM) {
                return x
            }
        }

    }
}

function hoverGameBox(e) {
    const boxDOM = gameBoard[0][findCol(e.target)].DOM;
    if (boxDOM.classList.contains("marked")) {
        boxDOM.classList.remove("marked");
    } else {
        boxDOM.classList.add("marked");
    }
}

function createTheWholeGameBoard() {
    for (let row = 0; row < 5; row++) {
        const rowBoxes = [];
        for (let col = 0; col < 5; col++) {
            rowBoxes.push({ DOM: createGameBox(), value: null });
        }
        gameBoard.push(rowBoxes);
    }
}
function startGame() {
    for (let i = 0; i < players.length; i++) {
        let playerIcon = players[i].icon
        players[i].scoreBoard.appendChild(playerIcon);
        const playerNameDOM = document.createElement("h2")
        playerNameDOM.textContent = players[i].username;
        players[i].scoreBoard.appendChild(playerNameDOM);
        const playerScoreDOM = document.createElement("h3")
        players[i].wins = 0;
        playerScoreDOM.textContent = players[i].wins;
        players[i].scoreBoard.appendChild(playerScoreDOM);

    }

    createTheWholeGameBoard();
    changeTurn(0); //starts with player 1 (ensures)

    resetBtn.addEventListener("click", () => {
        gameBoard = []
        winningArrayOfBoxes = []
        winnerOutputDOM.textContent = "Game off!";
        lockedBecauseSomeoneWon = false;
        document.getElementById("game-board").innerHTML = "";
        createTheWholeGameBoard();
        changeTurn(0);
    })
}

iconSelector();

const playerContinueBtn = document.getElementById("continue");
const inputDOM = document.querySelector("#player-selection input");
const choosePlayerInfoSectionDOM = document.querySelector("#player-selection");
const welcomeMessage = document.querySelector("#player-selection h1")
welcomeMessage.textContent = "Welcome player 1 !"
const winnerOutputDOM = document.querySelector("#game-section h2")
const resetBtn = document.getElementById("reset-btn");

playerContinueBtn.addEventListener("click", () => {
    let playerName = inputDOM.value;
    players[selectedPlayer].username = playerName;
    inputDOM.value = "";
    welcomeMessage.textContent = "Welcome player 2 !"
    if (iconCurrentlySelectedDivDOM.innerHTML !== "") {
        iconCurrentlySelectedDivDOM.innerHTML = "";
    }
    selectedPlayer++;
    if (selectedPlayer === 2) {
        choosePlayerInfoSectionDOM.style.display = "none";
        selectedPlayer = 0;
        startGame();
    }
})

