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
            return "You lost!";
        case 1:
            return "You won!";
        case 2:
            return "It is a tie";
        default:
            return "Wrong input";
    }
}

function playGame() {
    var playerScore = 0;
    var computerScore = 0;
    for (var i = 0; i < 5; i++) {
        const playerSelection = prompt("Enter your choice", "Rock");
        const output = playRound(playerSelection, getComputerChoice());
        if (output == 1) playerScore++;
        else if (output == 0) computerScore++;
        console.log(compareResult(output));
    }
    console.log(`Your score ${playerScore}`);
    console.log(`Computer score ${computerScore}`);
    if (playerScore === computerScore) console.log("It is a tie");
    else if (playerScore > computerScore) console.log("You won the game!");
    else console.log("You lost the game!");
}

playGame();