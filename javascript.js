console.log('I hate JS');

const cells = document.querySelectorAll(".cell");
const info = document.querySelector("#info");
const toggleAIBtn = document.querySelector("#toggleAIBtn");

const winCondtionAmount = 8;
const winCondtionRow = [
    [0,0,0], [1,1,1], [2,2,2],
    [0,1,2], [0,1,2], [0,1,2],

    [0,1,2], [0,1,2]
];

const winCondtionCol = [
    [0,1,2], [0,1,2], [0,1,2],
    [0,0,0], [1,1,1], [2,2,2],

    [0,1,2], [2,1,0]
];

let currentBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let currentPlayer = "?";
let aiPlayer = "?";
let winner = "?"; // X, O or None
let aiTurnedOn = false;

var emptyCellCount = 9;

initGame();

function gameEnded() {
    return (winner != "?");
}

function initGame(){
    // DONE.
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    toggleAIBtn.addEventListener("click", toggleAI);
    
    toggleAIBtnText();

    currentPlayer = "X";
    updateInfo();
}

function cellClicked(){
    if (gameEnded() == true){
        tauntPlayer("cellClicked");
        return;
    }
    // DONE.
    if (aiTurnedOn == true && aiPlayer == currentPlayer) {
        return;
    }
    const cellRow = this.getAttribute("row");
    const cellCol = this.getAttribute("col");

    if (currentBoard[cellRow][cellCol] == "") {
        updateCellManual(this, cellRow, cellCol);
        checkWinner();
    }
}

function updateCellManual(cell, cellRow, cellCol){ 
    // DONE.
    currentBoard[cellRow][cellCol] = currentPlayer;
    cell.textContent = currentPlayer;
    emptyCellCount--;
}

function updateInfo(){
    let turnPlayerText = currentPlayer;
    if (aiTurnedOn == true){
        if (aiPlayer == currentPlayer) {
            turnPlayerText = "the AI";
        }
        else {
            turnPlayerText = "the human";
        }
    }


    if (gameEnded() == true){
        if (winner == "None"){
            turnPlayerText = "Nobody";
        }
        else {
            turnPlayerText = turnPlayerText.charAt(0).toUpperCase() + turnPlayerText.slice(1);
        }
        infoText = turnPlayerText + " has won.";
    }
    else {
        infoText = "It is " + turnPlayerText + "'s turn.";
        if (turnPlayerText == "the AI") {
            makeAImove();
        }
    }
    
    info.textContent = infoText;

    console.log(currentBoard);
    console.log(emptyCellCount);
    console.log("AI is ON? " + aiTurnedOn);
    if (aiTurnedOn) console.log("AI player is " + aiPlayer);
    console.log("Current player is " + currentPlayer);
    console.log("winner = " + winner);
}

function makeAImove() {
    if (gameEnded() == true){
        return;
    }
    // This is stupid AI.
    for(let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (currentBoard[i][j] == ""){
                // make the move
                console.log("ai: "+i+" "+j);
                const targetCell = document.querySelector(`[row="${i}"][col="${j}"]`);
                targetCell.textContent = currentPlayer;
                currentBoard[i][j] = currentPlayer;
                emptyCellCount--;

                checkWinner();
                return;
            }
        }
    }
    checkWinner();
}

function checkWinner(){
    for (let i = 0; i < winCondtionAmount; ++i){
        const winRow = winCondtionRow[i];
        const winCol = winCondtionCol[i];

        let cellValue = ["", "", ""];
        for (let j = 0; j < 3; ++j){
            cellValue[j] = currentBoard[winRow[j]][winCol[j]]
        }
        if (cellValue[0] == cellValue[1] && cellValue[1] == cellValue[2] && cellValue[2] != ""){
            console.log("WINNER FOUND " + cellValue);
            winner = currentPlayer;
            break;
        }
    }

    if (winner == "?"){
        if(emptyCellCount == 0) {
            winner = "None";
        }
        else {
            changePlayer();
        }
    }
    updateInfo();
}

function changePlayer(){ 
    // DONE.
    if (currentPlayer == "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
}

function toggleAIBtnText(){
    // DONE?????
    let onOrOff = "ON";
    if (aiTurnedOn == true) {
        onOrOff = "OFF";
    }
    toggleAIBtn.textContent = "Turn " + onOrOff + " the AI";
}

function toggleAI(){
    if (gameEnded() == true){
        tauntPlayer("toggleAI");
        return;
    }
    aiTurnedOn = !aiTurnedOn;
    aiPlayer = currentPlayer;
    toggleAIBtnText();
    updateInfo();
}

function getTauntType(fromFunction){
    const taunt = [
        "Feeling indecisive, human? Can't handle a ","? 😏",

        "Can't handle a fair fight, huh? You can't escape defeat that easily!",
        "Nice try, human! But there's no escaping defeat. I'm here to stay! 😈", 
        "Running away after a win, human? Afraid you can't keep up with the challenge?",

        "Still itching for more, even after a draw? Well, I'm always up for another round. Let's see who claims victory this time!",
        "Game over, human! You already lost. No more moves for you. 😎",
        "Feeling extra competitive, huh? The game's already yours, but if you want to keep playing, prepare for another round of defeat!"
    ];
    if (fromFunction == "toggleAI"){
        if (aiTurnedOn == false){
            output = taunt[0];
            if (winner == "None"){
                output = output + "draw";
            }
            else {
                output = output + "lost";
            }
            return output + taunt[1];
        }
        else {
            if (winner == "None"){
                return taunt[2];
            }
            else if (aiPlayer == winner){
                return taunt[3];
            }
            else {
                return taunt[4];
            }
        }
    }
    else if ("cellClicked"){
        if (winner == "None"){
            return taunt[5];
        }
        else if (aiPlayer == winner){
            return taunt[6];
        }
        else {
            return taunt[7];
        }
    }
    else {
        return "Taunt ERROR";
    }
}
function tauntPlayer(fromFunction) {
    let taunt = getTaunt(fromFunction);
    
    info.textContent = taunts;
}