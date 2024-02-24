const themeBtn = document.querySelector(".theme-btn");
const themeIcon = document.querySelector(".theme-btn img");
const playerChoice = document.querySelector(".player-choice img");
const computerChoice = document.querySelector(".computer-choice img");
const options = document.querySelector(".options");
const resultContent = document.querySelector(".result-content");
const resultText = document.querySelector(".result");
const playerScoreText = document.querySelector(".player-score");
const computerScoreText = document.querySelector(".computer-score");
const playAgainBtn = document.querySelector(".play-again-btn");
const CHOICES = ["Rock", "Paper", "Scissors"];
let playerScore = 0;
let computerScore = 0;
// Theme change logic
const toggleIcon = () => {
    if (document.body.classList.contains("dark-theme")) {
        themeIcon.src = "assets/images/sun.png";
    }
    else {
        themeIcon.src = "assets/images/moon.png";
    }
}

// Initialising the page with correct icons
toggleIcon();

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    toggleIcon();
})

function getComputerChoice() {
    const index = Math.floor(Math.random() * 3);
    return CHOICES[index];
}

function playSelectAnimation(element) {
    options.removeEventListener("click", getInput);
    return new Promise((resolve) => {
        let selection = 'Rock';
        let index = 0;
        function changeSelection() {
            element.src = `assets/images/${selection}.svg`;
            index++;
            console.log(index);
            selection = CHOICES[index % 3];
            if (index === 20) {
                clearInterval(intervalId);
                options.addEventListener("click", getInput);
                resolve();
            }
        }
        const intervalId = setInterval(changeSelection, 100)
    })
}

function playRound(playerSelection, computerSelection) {
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

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore(playerScore, computerScore); // Need to make a state manager for the scores
    resultContent.style.display = "none";
    updateIcon(playerChoice, 'rock');
    updateIcon(computerChoice, 'rock');
    options.addEventListener("click", getInput);
}

function updateScore(playerScore, computerScore) {
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
}

function endGame() {
    resultContent.style.display = "block";
    options.removeEventListener("click", getInput);
}

function updateIcon(element, choice) {
    switch (choice.toLowerCase()) {
        case 'rock': element.src = "assets/images/Rock.svg";
            break;
        case 'paper': element.src = "assets/images/Paper.svg";
            break;
        case 'scissors': element.src = "assets/images/Scissors.svg";
            break;
    }
}


async function getInput(event) {
    let optionElement = event.target;
    if (optionElement.tagName === "IMG") optionElement = optionElement.parentElement;
    let playerSelection = "";
    let computerSelection = getComputerChoice();
    if (optionElement.classList.contains("rock")) playerSelection = "rock";
    if (optionElement.classList.contains("paper")) playerSelection = "paper";
    if (optionElement.classList.contains("scissors")) playerSelection = "scissors";
    updateIcon(playerChoice, playerSelection);
    await playSelectAnimation(computerChoice);
    updateIcon(computerChoice, computerSelection);
    const output = playRound(playerSelection, computerSelection);
    if (output == 1) playerScore++;
    else if (output == 0) computerScore++;
    console.log(`${playerScore} - ${computerScore}`)
    updateScore(playerScore, computerScore);
    if (playerScore === 5) {
        resultText.textContent = "YOU WON";
        endGame();
    }
    else if (computerScore === 5) {
        resultText.textContent = "YOU LOST";
        endGame();
    }
}

function playGame() {
    updateScore(playerScore, computerScore);
    options.addEventListener("click", getInput);
    playAgainBtn.addEventListener("click", () => {
        resetGame();
    })
}

playGame();