
const players = [{ scoreBoard: document.querySelector("#player1-score-board") }, { scoreBoard: document.querySelector("#player2-score-board") }];
let selectedPlayer = 0;
const gameBoard = [/*[{DOM: }{DOM: }][{DOM: }{DOM: }][{DOM: }{DOM: }]*/];
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
    iconBtns = document.querySelectorAll("#player-icon-section button");
    for (let i = 0; i < iconBtns.length; i++) {
        iconBtns[i].addEventListener("click", () => {
            for (let x = 0; x < iconBtns.length; x++) {
                iconBtns[x].querySelector("img").style.border = "none";
            }
            iconBtns[i].querySelector("img").style.border = "2px solid #d55e0f";
            iconBtns[i].querySelector("img").style.borderRadius = "8px";
            const iconCurrentlySelectedPictureDOM = document.createElement("img");
            if (iconCurrentlySelectedDivDOM.innerHTML !== "") {
                iconCurrentlySelectedDivDOM.innerHTML = "";
            }
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
function checkWinnerDiag(currentCol, currentRow) {

}

function checkWinner(currentCol, currentRow) {
    let horizWin = checkWinnerHoriz(currentRow)
    let vertiWin = checkWinnerVerti(currentCol)
    let diagWin = checkWinnerDiag(currentCol, currentRow)
    if (diagWin || horizWin || vertiWin) {

    }
}

function createGameBox() {
    const gameBoardDOM = document.querySelector("#game-board");
    const gameBoxDOM = document.createElement("div");
    gameBoxDOM.style.border = "1px solid black";
    gameBoxDOM.classList.add("game-box");
    gameBoxDOM.addEventListener('mouseover', hoverGameBox);
    gameBoxDOM.addEventListener('mouseout', hoverGameBox);
    gameBoxDOM.addEventListener('click', (e) => {
        const col = findCol(e.target);
        const row = findEmptySpotRow(col);
        gameBoard[row][col].value = selectedPlayer;
        checkWinner(col, row);
        //CheckOavgjort();
        if (selectedPlayer == 0) {
            gameBoard[row][col].DOM.style.backgroundColor = players[selectedPlayer].boxColor
            selectedPlayer = 1;
        }
        else if (selectedPlayer == 1) {
            gameBoard[row][col].DOM.style.backgroundColor = players[selectedPlayer].boxColor
            selectedPlayer = 0;
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
function startGame() {
    for (let i = 0; i < players.length; i++) {
        playerIcon = players[i].icon
        players[i].scoreBoard.appendChild(playerIcon);
        const playerNameDOM = document.createElement("h2")
        playerNameDOM.textContent = players[i].username;
        players[i].scoreBoard.appendChild(playerNameDOM);
    }
    for (let row = 0; row < 5; row++) {
        const rowBoxes = [];
        for (let col = 0; col < 5; col++) {
            rowBoxes.push({ DOM: createGameBox(), value: null });
        }
        gameBoard.push(rowBoxes);
    }
}

iconSelector();

const playerContinueBtn = document.getElementById("continue");
const inputDOM = document.querySelector("#player-selection input");
const choosePlayerInfoSectionDOM = document.querySelector("#player-selection");
const welcomeMessage = document.querySelector("#player-selection h1")
welcomeMessage.textContent = "Welcome player 1 !"

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

