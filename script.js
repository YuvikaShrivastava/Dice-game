let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let currentScore = 0;

const dice = document.getElementById('dice');
const rollBtn = document.getElementById('roll-btn');
const stopBtn = document.getElementById('stop-btn');
const restartBtn = document.getElementById('restart-btn');
const gameStatus = document.getElementById('game-status');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');

gameStatus.style.color = "#118ab2";

function rollDice() {
    setTimeout(() => {
        const diceValue = Math.floor(Math.random() * 6) + 1;
        dice.textContent = diceValue;

        if (diceValue === 6) {
            currentScore = 0;
            gameStatus.textContent = `Player ${currentPlayer} rolled a 6! Your score for this turn is reset.`;

            if (currentPlayer === 1) {
                player1Score = 0;
                player1ScoreDisplay.textContent = player1Score;
            } else {
                player2Score = 0;
                player2ScoreDisplay.textContent = player2Score;
            }

            setTimeout(() => {
                endTurn();
            }, 1000);
        } else {
            currentScore += diceValue;
            gameStatus.textContent = `Player ${currentPlayer}'s Turn. Current Turn Score: ${currentScore}`;
        }
    }, 500);
}

function endTurn() {
    if (currentPlayer === 1) {
        player1Score += currentScore;
        player1ScoreDisplay.textContent = player1Score;
        if (player1Score >= 50) {
            declareWinner(1);
            return;
        }
        currentPlayer = 2;
        gameStatus.style.color = "#c45ab3"; // Change to Player 2's color
        gameStatus.textContent = "Player 2's Turn";
    } else {
        player2Score += currentScore;
        player2ScoreDisplay.textContent = player2Score;
        if (player2Score >= 50) {
            declareWinner(2);
            return;
        }
        currentPlayer = 1;
        gameStatus.style.color = "#118ab2"; // Change to Player 1's color
        gameStatus.textContent = "Player 1's Turn";
    }
    currentScore = 0;
}

function declareWinner(winner) {
    gameStatus.textContent = `Player ${winner} Wins!`;
    rollBtn.disabled = true;
    stopBtn.disabled = true;
}

function restartGame() {
    currentPlayer = 1;
    player1Score = 0;
    player2Score = 0;
    currentScore = 0;
    player1ScoreDisplay.textContent = 0;
    player2ScoreDisplay.textContent = 0;
    gameStatus.textContent = "Player 1's Turn";
    gameStatus.style.color = "#118ab2"; // Reset to Player 1's color
    rollBtn.disabled = false;
    stopBtn.disabled = false;
}

rollBtn.addEventListener('click', rollDice);
stopBtn.addEventListener('click', endTurn);
restartBtn.addEventListener('click', restartGame);
