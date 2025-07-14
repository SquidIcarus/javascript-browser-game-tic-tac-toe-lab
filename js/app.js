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
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {  // if board has value of 'X' OR 'O'
        return;                                                       // exit the function
    }

    if (winner === true) {
        return;               // exit the function because there is a winner
    }


    console.log('Square clicked!', event.target); // log to see which element was clicked when a square is clicked
};


function render() {
    updateBoard();
    updateMessage();
};

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick); // changed to one click event to the board element

init();