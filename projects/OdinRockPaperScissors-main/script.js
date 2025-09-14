const startButton = document.querySelector("#gameStart");
const container = document.querySelector("#container");
startButton.addEventListener("click", startGame);

function startGame() {
    startButton.style.display = 'none';
    let humanScore = 0;
    let computerScore = 0;
    const text = document.createElement("p");
    text.textContent = "Choose your move:"
    container.appendChild(text);
    const buttons = document.createElement("div");
    const rockButton = document.createElement("button");
    const paperButton = document.createElement("button");
    const scissorsButton = document.createElement("button");
    rockButton.textContent = "Rock";
    paperButton.textContent = "Paper";
    scissorsButton.textContent = "Scissors";
    buttons.appendChild(rockButton);
    buttons.appendChild(paperButton);
    buttons.appendChild(scissorsButton);
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.appendChild(buttons);
    const score = document.createElement("div");
    score.textContent = `You: ${humanScore} | Computer: ${computerScore}`
    container.appendChild(score);

    function playRound(humanChoice, computerChoice) {
        if (humanChoice === computerChoice) {
            text.textContent = "Tie! Choose your next move:";
            score.textContent = `Score: You: ${humanScore} | Computer: ${computerScore}`;
        } else if (
            (humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")
        ) {
            humanScore++;
            text.textContent = `${humanChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}. Choose your next move:`;
            score.textContent = `Score: You: ${humanScore} | Computer: ${computerScore}`;
        } else {
            computerScore++;
            text.textContent = `${computerChoice.toUpperCase()} beats ${humanChoice.toUpperCase()}. Choose your next move:`;
            score.textContent = `Score: You: ${humanScore} | Computer: ${computerScore}`;
        }

        if (humanScore === 5) {
            text.textContent = "Congratulations, You won!";
            score.textContent = `You: ${humanScore} | Computer: ${computerScore}`;
        } else if (computerScore === 5) {
            text.textContent = "Bummer! The computer won. Better luck next time!";
            score.textContent = `You: ${humanScore} | Computer: ${computerScore}`;
        }
    }

    rockButton.addEventListener("click", function() {
        playRound("rock", getComputerChoice());
    });
    paperButton.addEventListener("click", function() {
        playRound("paper", getComputerChoice());
    });
    scissorsButton.addEventListener("click", function() {
        playRound("scissors", getComputerChoice());
    });
}



function getComputerChoice() {
    let choice = Math.random();
    if (choice < 0.34) {
        return "rock";
    } else if (choice < 0.67) {
        return "paper";
    } else {
        return "scissors";
    }
}

