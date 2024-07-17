document.addEventListener("DOMContentLoaded", function () {
    ControlFlow.createFormModal();
    Gameboard.init();
});

const Gameboard = {
    gameboard: [],
    //initialize the grid
    init: function () {
        const grid = document.querySelector(".game-board");
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(3, 100px)";
        grid.style.gridTemplateRows = "repeat(3, 100px)";
        grid.style.margin = "auto";
        grid.style.position = "absolute";
        grid.style.top = "50%";
        grid.style.left = "50%";
        grid.style.transform = "translate(-50%, -50%)";

        for (let i = 0; i < 3; ++i) {
            this.gameboard[i] = [];
            for (let j = 0; j < 3; ++j) {
                this.gameboard[i][j] = null;
                let createGrid = document.createElement("div");
                createGrid.style.width = "100px";
                createGrid.style.height = "100px";
                createGrid.style.border = "1px solid black";
                grid.appendChild(createGrid);
            }
        }
    }
};

const Player = {
    name: '',
    marker: '',
}

const ControlFlow = {
    createFormModal: function () {
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
    // updateInfo: function() {
    //     const one = document.querySelector(".one");
    //     const two = document.querySelector(".two");
    //     let player1Color = 
    //     let player2Color = 
    // }
    startGame: function () {
        const player1Name = document.getElementById("player1").value;
        const player2Name = document.getElementById("player2").value;
        const player1Color = document.getElementById("color1").value;
        const player2Color = document.getElementById("color2").value;
        const player1Type = document.querySelector('input[name="typeof"]:checked').value;
        console.log(player1Type);
        if (player1Type.value === 'X')
            player2Type = 'O';
        else
            player2Type = 'X';

        console.log(`Player 1: ${player1Name}, Color: ${player1Color}, Type: ${player1Type}`);
        console.log(`Player 2: ${player2Name}, Color: ${player2Color}, Type: ${player2Type}`);

        document.querySelector(".one").textContent = `Player 1: ${player1Name} (${player1Type})`;
        document.querySelector(".one").style.color = player1Color;
        document.querySelector(".two").textContent = `Player 2: ${player2Name} (${player2Type})`;
        document.querySelector(".two").style.color = player2Color;

        const modal = document.querySelector(".modal");
        const modalOverlay = document.querySelector(".modal-overlay");
        modal.classList.remove("show");
        modalOverlay.classList.remove("show");
    }
}

// const Player1 = Object.create(Player);
// const Gameboard1 = Object.create(Gameboard);
// Gameboard1.init();
// Player1.name = 'Corey';
// alert(Player1.name);
