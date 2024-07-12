let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
            highlightTurn(); // Call highlightTurn after each move
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "calc(100% / 2)";
}

function highlightTurn() {
    const currentPlayer = turn === "X" ? "Player X" : "Player O";

    // Remove highlight from all boxes
    boxes.forEach(box => {
        box.classList.remove('turn-highlight');
    });

    // Highlight current player's turn
    document.querySelector(".turn-box:nth-child(" + (turn === "X" ? 1 : 2) + ")").classList.add('turn-highlight');
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
        let symbols = condition.map(index => boxes[index].innerHTML);
        if (symbols.every(symbol => symbol === "X") || symbols.every(symbol => symbol === "O")) {
            isGameOver = true;
            document.getElementById("results").innerHTML = turn + " wins";
            document.getElementById("play-again").style.display = "inline";

            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#08d9d6";
                boxes[index].style.color = "#000";
            });

            return;
        }
    }
}

function checkDraw() {
    if (!isGameOver && Array.from(boxes).every(box => box.innerHTML !== "")) {
        isGameOver = true;
        document.getElementById("results").innerHTML = "Draw";
        document.getElementById("play-again").style.display = "inline";
    }
}

document.getElementById("play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.getElementById("results").innerHTML = "";
    document.getElementById("play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "black";
    });
});
