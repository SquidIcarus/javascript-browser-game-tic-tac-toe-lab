/*-------------------------------- Constants --------------------------------*/

const winningCombos = [ // each set of three arrays represents the grid 
    [0, 1, 2], // horizontal combos
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertical combos
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // two diagonal combos
    [2, 4, 6],
];

/*-------------------------------- Variables (state) ------------------------*/

let board = ['', '', '', '', '', '', '', '', '']; // changed to array that represents all nine boxes
let turn = null;
let winner = null;
let tie = null;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById("message");
const boardEl = document.querySelector(".board");
const resetBtnEl = document.getElementById("reset");

// console.log(squareEls);
// console.log(messageEl);
// console.log(boardEl);

/*-------------------------------- Functions --------------------------------*/

function init() {    // function to initialize the game upon loading
    console.log('board initialized')
    board = ['', '', '', '', '', '', '', '', '']; // sets the board to nine empty strings
    turn = 'X'; // turn set to start with 'X'
    winner = false; // winner set to false, no winner yet
    tie = false; // tie set to false
    render(); // calling the render function 
};

function updateBoard() {
    board.forEach((cell, index) => {      // forEach to loop through board array
        const squareEl = squareEls[index]; // using the index t oaccess the corresponding squareEls
        if (cell === 'X') {                // update the square depending on the value of each cell
            squareEl.textContent = 'X';
        } else if (cell === 'O') {
            squareEl.textContent = 'O';
        } else {
            squareEl.textContent = '';
        }
    });
};

function updateMessage() {
    if (winner === false && tie === false) {   // if no winner and not a tie
        messageEl.textContent = `It's ${turn}'s turn`;  // then render whos turn it is based on the `turn` variable
    } else if (winner === false && tie === true) {   // if there is no winner and it's a tie
        messageEl.textContent = `Cat's Game! 😸`;    // then render a 'tie' message
    } else {
        messageEl.textContent = `Congratulations ${turn} Wins!`;  // Otherwise, congratulations player based on `turn` variable has won!
    }
};

function handleClick(event) {          // handleClick function with an `event` parameter (what happens when a square is clicked)
    // to ensure the element clicked is a `sqr`
    if (!event.target.classList.contains('sqr')) {  // if the click does NOT contain a `sqr` then
        return;                                      // exit the function
    }

    const squareIndex = event.target.id;  // obtains the index of the clicked square and assigns to `squareIndex`
    // otherwise, if `sqr` is clicked
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {  // if board has value of 'X' OR 'O' at specified `squareIndex`
        return;                                                       // exit the function
    }

    if (winner === true) {
        return;               // exit the function because there is a winner
    }

    placePiece(squareIndex); // call `placePiece` function
    checkForWinner();        // call the `checkForWinner` function
    checkForTie();           // call `checkForTie` function
    switchPlayerTurn();      // call `switchPlayerTurn();`
    render();                // call `render()` to updateBoard and updateMessage
    
    // console.log(squareIndex);
    // console.log('Square clicked!', event.target); // log to see which element was clicked when a square is clicked
};

function placePiece(index) {
    board[index] = turn; // update the board array at the index with the current players turn symbol
    console.log(board);
};

function checkForWinner() {
    winningCombos.forEach(combo => {           // loop through each winning combination
        const firstPos = board[combo[0]];      // horizontal combos
        const secondPos = board[combo[1]];     // vertical combos
        const thirdPos = board[combo[2]];      // diagonal combos

        if (firstPos !== ''                    // first position is not empty and
            && firstPos === secondPos          // first position equals second position and 
            && firstPos === thirdPos) {        // first position equals third position
            winner = true;                     // if all conditions are true, we have a winner!
        }
    });
    console.log(`winner:`, winner);
};

function checkForTie() {
    if (winner === true) {    // if there is a winner
        return;               // exit the function
    }

    if (board.includes('')) {  // if board is still open
        tie = false;           // cant have a tie
    } else {                   // otherwise, board is full
        tie = true;            // we have a tie!  
    }
    // console.log('Tie!');
};

function switchPlayerTurn() {
    if (winner === true) {         // check if winner exists
        return;                    // if so, exit function                         
    }
    if (turn === 'X') {            // switch `turn`
        turn = 'O';
    } else {
        turn = 'X';
    }                               // function called in `handleClick` event, log shows `turn` switching 
}

function render() {
    updateBoard();
    updateMessage();
};

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick); // changed to one click event to the board element

resetBtnEl.addEventListener('click', init); // event listener to reset button
init();