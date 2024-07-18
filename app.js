document.addEventListener("DOMContentLoaded", function () {
    ControlFlow.createFormModal();
    Gameboard.init();
});

const Gameboard = {
    gameboard: [],
    winningCombos: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6], // diagonals
    ],
    //initialize the grid
    init: function () {
        const grid = document.querySelector(".game-board");
        grid.innerHTML = "";

        for (let i = 0; i < 3; ++i) {
            this.gameboard[i] = [];
            for (let j = 0; j < 3; ++j) {
                this.gameboard[i][j] = null;
                let createGrid = document.createElement("div");
                createGrid.className = "a-grid";
                createGrid.addEventListener("click", () => ControlFlow.markCell(i, j));
                grid.appendChild(createGrid);
                this.gameboard[i][j] = createGrid;
            }
        }
    },
    checkCase: function (currentPlayer) {
        const flatBoard = this.gameboard.flat().map(cell => cell.textContent);

        for (let combo of this.winningCombos) {
            if (
                flatBoard[combo[0]] &&
                flatBoard[combo[0]] === flatBoard[combo[1]] &&
                flatBoard[combo[0]] === flatBoard[combo[2]]
            ) {
                console.log("Winner");
                alert(`${currentPlayer.name} is the winner!`);
                this.restartGame();
                return true;
            }
        }
        console.log("No Winner");
        return false;
    },
    checkDraw: function () {
        const flatBoard = this.gameboard.flat().map(cell => cell.textContent);
        return flatBoard.every(cell => cell);
    },
    restartGame: function () {
        // const btn = document.querySelector(".button");
        const grid = document.querySelector(".game-board");
        let btn = document.createElement("button");
        btn.className = "button";
        btn.textContent = "Replay";
        grid.appendChild(btn);
        btn.addEventListener("click", () => {
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }

            this.gameboard = [];
            ControlFlow.resetPlayers();
            ControlFlow.createFormModal();
            this.init();
        });
    },
};

const ControlFlow = {
    currentTurn: null,
    player1: null,
    player2: null,

    createFormModal: function () {
        const formContainer = document.getElementById("form-container");
        formContainer.innerHTML = "";
        const modalOverlay = document.createElement("div");
        modalOverlay.className = "modal-overlay";
        document.body.appendChild(modalOverlay);

        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
        <form id="player-form">
            <section> 
                <label for="player1">Player 1:</label>
                <input type="text" id="player1" name="player1" required><br>
                <label for="color1"> Color:</label>
                <select name="color1" id="color1">
                    <option>red</option>
                    <option>blue</option>
                    <option>green</option>
                    <option>black</option>
                </select></br>
                <input type="radio" id="typeof" name="typeof" value="X" required>
                <label for="typeX">X</label></br>
                <input type="radio" id="typeof" name="typeof" value="O" required>
                <label for="typeO">O</label></br>
            </section></br>
            <section>
                <label for="player2">Player 2:</label>
                <input type="text" id="player2" name="player2" required></br>
                <label for="color2"> Color: </label>
                <select name="color2" id="color2">
                    <option>red</option>
                    <option>blue</option>
                    <option>green</option>
                    <option>black</option>
                </select></br>
            </section></br>
            <button type="button" onclick="ControlFlow.startGame()">Start Game</button>
        </form>
    `;
        document.body.appendChild(modal);

        modalOverlay.classList.add("show");
        modal.classList.add("show");
    },
    //called from first line of startGame function 
    getPlayers: function () {
        const player1Name = document.getElementById("player1").value || "Player1";
        const player2Name = document.getElementById("player2").value || "Player2";

        const player1Color = document.getElementById("color1").value;
        const player2Color = document.getElementById("color2").value;
        const player1Type = document.querySelector('input[name="typeof"]:checked').value;
        const player2Type = player1Type === 'X' ? 'O' : 'X';

        this.player1 = { name: player1Name, color: player1Color, type: player1Type };
        this.player2 = { name: player2Name, color: player2Color, type: player2Type };
        this.currentTurn = this.player1; // Start with player1

        return { player1: this.player1, player2: this.player2 };
    },
    //called from the form onclick
    startGame: function () {
        let { player1, player2 } = this.getPlayers();

        if (!player1 || !player2) {
            console.error("Player information is not set correctly.");
            return;
        }


        console.log(`Player 1: ${player1.name}, Color: ${player1.color}, Type: ${player1.type}`);
        console.log(`Player 2: ${player2.name}, Color: ${player2.color}, Type: ${player2.type}`);

        document.querySelector(".one").textContent = `Player 1: ${player1.name} (${player1.type})`;
        document.querySelector(".one").style.color = player1.color;
        document.querySelector(".two").textContent = `Player 2: ${player2.name} (${player2.type})`;
        document.querySelector(".two").style.color = player2.color;
        console.log(`Start game ${player1.name} ${player2.name}`);

        const modal = document.querySelector(".modal");
        const modalOverlay = document.querySelector(".modal-overlay");
        // Ensure the modal and overlay exist before removing them
        if (modal && modalOverlay) {
            modal.classList.remove("show");
            modalOverlay.classList.remove("show");
            modal.remove();
            modalOverlay.remove();
        } else {
            console.error("Modal or Modal Overlay not found.");
        }
    },
    //called from the onclick in gameboard object
    markCell: function (row, col) {
        const cell = Gameboard.gameboard[row][col];

        // Check if the cell is already marked
        if (!cell.textContent) {
            // if not then input the X or O
            cell.textContent = this.currentTurn.type;
            cell.style.color = this.currentTurn.color;
            // Stop the game if there is a win
            if (Gameboard.checkCase(this.currentTurn)) {
                // Gameboard.restartGame();
                return;
            }
            if (Gameboard.checkDraw()) {
                alert("It's a draw!");
                Gameboard.restartGame();
                return;
            }
            // Switch turns
            this.currentTurn = this.currentTurn === this.player1 ? this.player2 : this.player1;
        }
    },
    resetPlayers: function () {
        console.log("Before reset:", this.player1, this.player2);
        this.player1 = null;
        this.player2 = null;
        this.currentTurn = null;
        console.log("After reset:", this.player1, this.player2);

        // Reset the form fields
        const form = document.getElementById("player-form");
        if (form) {
            form.reset();  // Reset the form fields
        }

        // Reset the player display info
        document.querySelector(".one").textContent = "Player 1: N/A";
        document.querySelector(".one").style.color = "black";
        document.querySelector(".two").textContent = "Player 2: N/A";
        document.querySelector(".two").style.color = "black";

    }
}