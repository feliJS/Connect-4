
const players = [{}, {}];
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

function setPlayerName() {
    const inputDOM = document.querySelector("#player-selection input");
    const playerName = inputDOM.value;
    players[selectedPlayer].username = playerName;
}

iconSelector();
const playerContinueBtn = document.getElementById("continue");
playerContinueBtn.addEventListener("click", () => {
    setPlayerName();
    selectedPlayer++;
    if (selectedPlayer === 2) {
        const choosePlayerInfoSectionDOM = document.querySelector("#player-selection");
        choosePlayerInfoSectionDOM.style.display = "none";
    }
})