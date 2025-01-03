
const players = [{ scoreBoard: document.querySelector("#player1-score-board") }, { scoreBoard: document.querySelector("#player2-score-board") }];
let selectedPlayer = 0;


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

function startGame() {
    for (let i = 0; i < players.length; i++) {
        playerIcon = players[i].icon
        players[i].scoreBoard.appendChild(playerIcon);
        const playerNameDOM = document.createElement("h2")
        playerNameDOM.textContent = players[i].username;
        players[i].scoreBoard.appendChild(playerNameDOM);
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

