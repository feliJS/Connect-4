
const players = [{ scoreBoard: document.querySelector("#player1-score-board") }, { scoreBoard: document.querySelector("#player2-score-board") }];
let selectedPlayer = 0;
const gameBoard = [];


function iconSelector() {
    iconBtns = document.querySelectorAll("#player-icon-section button");
    for (let i = 0; i < iconBtns.length; i++) {
        iconBtns[i].addEventListener("click", () => {
            for (let x = 0; x < iconBtns.length; x++) {
                iconBtns[x].style.border = "none";
            }
            iconBtns[i].style.border = "2px solid tomato";
            players[selectedPlayer].icon = iconBtns[i].querySelector("img");
        })
    }
}

function createGameBox() {
    const gameBoardDOM = document.querySelector("#game-board");
    const gameBoxDOM = document.createElement("div");
    gameBoxDOM.style.border = "1px solid black";
    gameBoxDOM.classList.add("game-box");
    gameBoardDOM.appendChild(gameBoxDOM);
    return gameBoxDOM;
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
            rowBoxes.push({DOM: createGameBox(), value: null});
        }
        gameBoard.push(rowBoxes);
    }
}

iconSelector();

const playerContinueBtn = document.getElementById("continue");
const inputDOM = document.querySelector("#player-selection input");

playerContinueBtn.addEventListener("click", () => {
    let playerName = inputDOM.value;
    players[selectedPlayer].username = playerName;
    inputDOM.value = "";
    selectedPlayer++;
    if (selectedPlayer === 2) {
        const choosePlayerInfoSectionDOM = document.querySelector("#player-selection");
        choosePlayerInfoSectionDOM.style.display = "none";
        startGame();
    }
})

