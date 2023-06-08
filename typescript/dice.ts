/**
 * A object representing a player in the game
 */
class Player {
    /** The player's name */
    name:string; 
    /** The player's current total score */
    score:number; 
}
// Create global player objects
let player1 = newPlayer("");
let player2 = newPlayer("");

// load sound effects
let rollSound = new Audio('media/dice-roll.wav');
let pigSound = new Audio('media/pig-squeal.mp3');

/**
 * Changes the current turn
 */
function changePlayers():void{
    let currentPlayerName = getCurrPlayer();
    getInputById("score1").value = player1.score.toString();
    getInputById("score2").value = player2.score.toString();

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName.innerText == player1.name) {
        currentPlayerName.innerText = player2.name;
    }
    else {
        currentPlayerName.innerText = player1.name;
    }
}

/**
 * Constructs a new player object
 * @param newName The name of the player
 * @returns A complete player object
 */
function newPlayer(newName:string):Player{
    let newPlayer = new Player();
    newPlayer.name = newName;
    newPlayer.score = 0;
    return newPlayer;
}

/**
 * Wires button functions on load
 */
window.onload = function(){
    let newGameBtn = getInputById("new_game");
    newGameBtn.onclick = createNewGame;

    let rollBtn = getInputById("roll");
    rollBtn.onclick = rollDie;

    let holdBtn = getInputById("hold");
    holdBtn.onclick = holdDie;
}

/**
 * Starts a new game
 */
function createNewGame(){
    //set player 1 and player 2 scores to 0
    player1.score = 0;
    player2.score = 0;
    //verify each player has a name
    //if both players don't have a name display error
    clearErrors();
    if (isValid()) {
        //if both players do have a name start the game!
        getById("turn").classList.add("open");
        getInputById("total").value = "0";
        //lock in player names and then change players
        player1.name = getInputById("player1").value;
        getById("player1").setAttribute("disabled", "disabled")
        player2.name = getInputById("player2").value;
        getById("player2").setAttribute("disabled", "disabled");
        changePlayers();
        // if player1 went first on last game of current instance of page
        // player2 will go first on the next game and vice versa
    }
}

/**
 * Checks if both players have names
 * @returns True if both players have names
 */
function isValid():boolean{
    let isValid = true;
    if (getInputById("player1").value == "" || 
        getInputById("player2").value == "" ) {
            isValid = false;
            displayMessage("Both players must have names");
    }
    return isValid;
}

/**
 * Displays a message
 * @param errorMessage Message to be displayed
 */
function displayMessage(errorMessage:string):void{
    let errorDiv = getById("error");

    // Create <h3> with error message
    let errorInfo = document.createElement("h3");
    errorInfo.innerText = errorMessage;

    errorDiv.appendChild(errorInfo);
}

/**
 * Clears error on valid submission
 */
function clearErrors():void{
    console.log("clearError was called");
    
    let errorDiv = getById("error");
    while(errorDiv.firstChild) {
        errorDiv.removeChild(errorDiv.lastChild);
    }
}

/**
 * Rolls a d6 and displays result
 */
function rollDie():void{
    let die = getInputById("die");
    let currTotal = getInputById("total");
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let dieRoll = generateRandomValue(1, 6);
    

    //if the roll is 1
    //  change players
    //  set current total to 0
    if (dieRoll == 1) {
        die.value = ""
        currTotal.value = "0";
        changePlayers();
        // play pig noise?
        pigSound.play();
    }
    
    else{
        //if the roll is greater than 1
        //  add roll value to current total
        let newTotal = dieRoll + parseInt(currTotal.value);

        //set the die roll to value player rolled
        //display current total on form
        die.value = dieRoll.toString();
        currTotal.value = newTotal.toString();
        // play die roll noise?
        rollSound.play();
    }
}

/**
 * Adds the turn total to the current player and ends the turn
 */
function holdDie():void{
    //get the current turn total
    let currTotal = parseInt(getInputById("total").value);

    //determine who the current player is
    //add the current turn total to the player's total score
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

    //reset the turn total to 0
    getInputById("die").value = "0";
    getInputById("total").value = "0";

    //change players
    changePlayers();
}

/**
 * Ends the current game and enables player name change
 * @param winner The player that won
 */
function gameOver(winner:string) {
    displayMessage(winner + " wins!");
    getById("turn").classList.remove("open");
    getById("player1").removeAttribute("disabled")
    getById("player2").removeAttribute("disabled");
}

/**
 * Rolls a die
 * @param minValue The lowest value to be rolled
 * @param maxValue The highest value to be rolled
 * @returns A random roll
 */
function generateRandomValue(minValue:number, maxValue:number):number{
    let random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    
    //TODO: use random to generate a number between min and max

    return random;
}

/**
 * Returns the string of the current player
 * @returns current player
 */
function getCurrPlayer():HTMLElement{
    return getById("current");
}


function getById(id:string):HTMLElement{
    return document.getElementById(id);
}

function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}