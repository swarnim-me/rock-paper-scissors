function getComputerChoice() {
    const options = ["Rock", "Paper", "Scissors"];
    const index = Math.floor(Math.random() * 3);
    return options[index];
}


function playRound(playerSelection, computerSelection) {
    console.log(computerSelection);
    var isPlayerWinner = 0;
    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) isPlayerWinner = 2;
    else if (playerSelection.toLowerCase() === 'rock') {
        isPlayerWinner = computerSelection.toLowerCase() === 'scissors' ? 1 : 0;
    }
    else if (playerSelection.toLowerCase() === 'paper') {
        isPlayerWinner = computerSelection.toLowerCase() === 'rock' ? 1 : 0;
    }
    else if (playerSelection.toLowerCase() === 'scissors') {
        isPlayerWinner = computerSelection.toLowerCase() === 'paper' ? 1 : 0;
    }
    else {
        isPlayerWinner = -1;
    }
    return isPlayerWinner;
}

function compareResult(output) {
    switch (output) {
        case 0:
            return "You Lose!";
        case 1:
            return "You Won!";
        case 2:
            return "It is a tie";
        default:
            return "Wrong Input";
    }
}

function playGame() {
    for (var i = 0; i < 5; i++) {
        const playerSelection = prompt("Enter your choice", "Rock");
        const output = playRound(playerSelection, getComputerChoice());
        console.log(compareResult(output));
    }
}

playGame();