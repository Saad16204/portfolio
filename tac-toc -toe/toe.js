document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameStatus = ['','','','','','','','',''];

    // Initialize the game board
    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Handle cell clicks
    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameStatus[index] === '' && !checkWinner()) {
            gameStatus[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWinner()) {
                status.textContent = `${currentPlayer} wins!`;
            } else if (gameStatus.every(cell => cell !== '')) {
                status.textContent = 'It\'s a draw!';
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameStatus = ['','','','','','','','',''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }

    // Check for a winner
    function checkWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return gameStatus[a] !== '' && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c];
        });
    }

    // Event listeners
    resetBtn.addEventListener('click', resetGame);

    // Initialize the game
    initializeBoard();
    status.textContent = `Player ${currentPlayer}'s turn`;
});
