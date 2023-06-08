var Player = (function () {
    function Player() {
    }
    return Player;
}());
var player1 = newPlayer("");
var player2 = newPlayer("");
var rollSound = new Audio('media/dice-roll.wav');
var pigSound = new Audio('media/pig-squeal.mp3');
function changePlayers() {
    var currentPlayerName = getCurrPlayer();
    getInputById("score1").value = player1.score.toString();
    getInputById("score2").value = player2.score.toString();
    if (currentPlayerName.innerText == player1.name) {
        currentPlayerName.innerText = player2.name;
    }
    else {
        currentPlayerName.innerText = player1.name;
    }
}
function newPlayer(newName) {
    var newPlayer = new Player();
    newPlayer.name = newName;
    newPlayer.score = 0;
    return newPlayer;
}
window.onload = function () {
    var newGameBtn = getInputById("new_game");
    newGameBtn.onclick = createNewGame;
    var rollBtn = getInputById("roll");
    rollBtn.onclick = rollDie;
    var holdBtn = getInputById("hold");
    holdBtn.onclick = holdDie;
};
function createNewGame() {
    player1.score = 0;
    player2.score = 0;
    clearErrors();
    if (isValid()) {
        getById("turn").classList.add("open");
        getInputById("total").value = "0";
        player1.name = getInputById("player1").value;
        getById("player1").setAttribute("disabled", "disabled");
        player2.name = getInputById("player2").value;
        getById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function isValid() {
    var isValid = true;
    if (getInputById("player1").value == "" ||
        getInputById("player2").value == "") {
        isValid = false;
        displayMessage("Both players must have names");
    }
    return isValid;
}
function displayMessage(errorMessage) {
    var errorDiv = getById("error");
    var errorInfo = document.createElement("h3");
    errorInfo.innerText = errorMessage;
    errorDiv.appendChild(errorInfo);
}
function clearErrors() {
    console.log("clearError was called");
    var errorDiv = getById("error");
    while (errorDiv.firstChild) {
        errorDiv.removeChild(errorDiv.lastChild);
    }
}
function rollDie() {
    var die = getInputById("die");
    var currTotal = getInputById("total");
    var dieRoll = generateRandomValue(1, 6);
    if (dieRoll == 1) {
        die.value = "";
        currTotal.value = "0";
        changePlayers();
        pigSound.play();
    }
    else {
        var newTotal = dieRoll + parseInt(currTotal.value);
        die.value = dieRoll.toString();
        currTotal.value = newTotal.toString();
        rollSound.play();
    }
}
function holdDie() {
    var currTotal = parseInt(getInputById("total").value);
    if (getCurrPlayer().innerText == player1.name) {
        player1.score += currTotal;
        if (player1.score >= 100) {
            gameOver(player1.name);
        }
    }
    else {
        player2.score += currTotal;
        if (player2.score >= 100) {
            gameOver(player2.name);
        }
    }
    getInputById("die").value = "0";
    getInputById("total").value = "0";
    changePlayers();
}
function gameOver(winner) {
    displayMessage(winner + " wins!");
    getById("turn").classList.remove("open");
    getById("player1").removeAttribute("disabled");
    getById("player2").removeAttribute("disabled");
}
function generateRandomValue(minValue, maxValue) {
    var random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return random;
}
function getCurrPlayer() {
    return getById("current");
}
function getById(id) {
    return document.getElementById(id);
}
function getInputById(id) {
    return document.getElementById(id);
}
