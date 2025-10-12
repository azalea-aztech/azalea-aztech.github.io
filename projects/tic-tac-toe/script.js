function Gameboard() {
    board = []; // we need two coordinates!!

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Square());
        }
    }

    const getBoard = () => board;

    const addMark = (row, column, player) => {

        if (board[row][column].getValue() === " ") board[row][column].addValue(player);
    }

    const printBoard = () => {
        const boardWithSquareValues = board.map((row) => row.map((square) => square.getValue()))
        console.log(boardWithSquareValues);
    };

    return { getBoard, addMark, printBoard };
}  

function Square() {
    let value = " ";

    const addValue = (player) => {
        value = player.mark;
    };

    const getValue = () => value;

    return {
        addValue,
        getValue
    };

}

function GameController(
    playerOneName,
    playerTwoName
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: "O"
        },
        {
            name: playerTwoName,
            mark: "X"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    let gameOver = false;

    const checkForWin = () => {
        const boardArr = board.getBoard();
        // check rows
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i][0].getValue() !== " ") {
                if (boardArr[i][0].getValue() === boardArr[i][1].getValue() && boardArr[i][0].getValue() === boardArr[i][2].getValue()){
                    gameOver = true;
                    return { winner: getActivePlayer().name };
                }
            } 
        }

        // check columns
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[0][i].getValue() !== " ") {
                if (boardArr[0][i].getValue() === boardArr[1][i].getValue() && boardArr[0][i].getValue() === boardArr[2][i].getValue()){
                    gameOver = true;
                    return { winner: getActivePlayer().name };
                }
            }
        }

        // check diagonals
        if (boardArr[0][0].getValue() !== " " && boardArr[0][0].getValue() === boardArr[1][1].getValue() && boardArr[0][0].getValue() === boardArr[2][2].getValue()) {
            gameOver = true;
            return { winner: getActivePlayer().name };
        }
        if (boardArr[0][2].getValue() !== " " && boardArr[0][2].getValue() === boardArr[1][1].getValue() && boardArr[0][2].getValue() === boardArr[2][0].getValue()) {
            gameOver = true;
            return { winner: getActivePlayer().name };
        }

        // check for a tie
        if (boardArr.every(row => row.every(square => square.getValue() !== " "))) {
            gameOver = true;
            return { tie: true }; 
        }
        switchPlayerTurn();
        return null;
    }

    const playRound = (row, column) => {
        if (gameOver) return;
        const boardArr = board.getBoard();
        if (boardArr[row][column].getValue() !== " ") {
            return;
        }
        board.addMark(row, column, getActivePlayer());
        const result = checkForWin();
        return result;
    };

    return {
        playerOneName,
        playerTwoName,
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        isGameOver: () => gameOver
    };

}

function displayController() {
    let game;
    const gameContainer = document.getElementById("game-container");
    const gameBoard = document.querySelector(".gameboard");
    const playerTurn = document.querySelector(".turn");
    const heading = document.querySelector(".big-header");
    let startGameButton;

    const beginPage = () => {
        heading.style.fontSize = "100px"
        playerTurn.textContent = "Please enter your names:";
        gameBoard.style.display = "none";
        const input1 = document.createElement("div");
        const input2 = document.createElement("div");
        const input1label = document.createElement("p");
        input1label.textContent = "Player 1: ";
        const input2label = document.createElement("p");
        input2label.textContent = "Player 2: ";
        const playerOneInput = document.createElement("input");
        const playerTwoInput = document.createElement("input");
        playerOneInput.setAttribute("type", "text");
        playerTwoInput.setAttribute("type", "text"); 
        input1.appendChild(input1label);
        input1.appendChild(playerOneInput);
        input2.appendChild(input2label);
        input2.appendChild(playerTwoInput);
        input1.classList.add("nameEntryDiv");
        input2.classList.add("nameEntryDiv");  
        gameContainer.appendChild(input1);
        gameContainer.appendChild(input2);

        const errorMsg = document.createElement("div");
        errorMsg.style.color = "red";
        errorMsg.style.marginTop = "8px";
        gameContainer.appendChild(errorMsg);

        startGameButton = document.createElement("button");
        startGameButton.textContent = "Start Game";
        startGameButton.classList.add("normal-button");
        startGameButton.addEventListener("click", () => {
            const nameOne = playerOneInput.value;
            const nameTwo = playerTwoInput.value;

            if (nameOne === "" || nameTwo === "") {
                errorMsg.textContent = "Both player names are required!";
                return;
            }

            errorMsg.textContent = ""; // Clear error
            heading.style.fontSize = "50px";
            input1.style.display = "none";
            input2.style.display = "none";
            startGameButton.textContent = "Restart Game";
            if(!gameContainer.contains(mainMenuBtn)) {
                gameContainer.appendChild(mainMenuBtn);
            }
            
            gameBoard.style.display = "grid";
            game = GameController(nameOne, nameTwo);
            updateScreen();
        })
        gameContainer.appendChild(startGameButton)
        // updateScreen(); // initial render
    }

    const mainMenuBtn = document.createElement("button");
    mainMenuBtn.textContent = "Main Menu";
    mainMenuBtn.classList.add("normal-button");
    mainMenuBtn.addEventListener("click", () => {
        if (startGameButton && gameContainer.contains(startGameButton)) {
            gameContainer.removeChild(startGameButton);
        }
        if (gameContainer.contains(mainMenuBtn)) {
            gameContainer.removeChild(mainMenuBtn);
        }
        beginPage();
    });

    const updateScreen = (result) => {
        // clear the board
        gameBoard.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        if (result?.winner) {
            playerTurn.textContent = `${activePlayer.name} wins!`;
        } else if (result?.tie) {
            playerTurn.textContent = "It's a tie!";
        } else {
            playerTurn.textContent = `${activePlayer.name}'s turn...`;
        }
        
        board.forEach((row, indexX) => {
            row.forEach((square, indexY) => {
                const squareButton = document.createElement("button");
                squareButton.classList.add("square");
                squareButton.dataset.column = indexY;
                squareButton.dataset.row = indexX;
                squareButton.textContent = square.getValue();
                if (!game.isGameOver()) {
                    squareButton.disabled = square.getValue() !== " " ? true : false;
                } else {
                    squareButton.disabled = true;
                }
                gameBoard.appendChild(squareButton);
            })
        })
    }
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedColumn || !selectedRow) return;
        const result = game.playRound(Number(selectedRow), Number(selectedColumn));

        updateScreen(result);
    }

    gameBoard.addEventListener("click", clickHandlerBoard);
    beginPage();
}

displayController();