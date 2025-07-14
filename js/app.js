/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables (state) ------------------------*/

let board = ['', '', '', '', '', '', '', '', '']; // changed to array that represents all nine boxes
let turn = null;
let winner = null;
let tie = null;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById("message");

console.log(squareEls);
console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/

function init() {    // function to initialize the game upon loading
    console.log('board initializing')
    board = ['', '', '', '', '', '', '', '', '']; // sets the board to nine empty strings
    turn = 'X'; // turn set to start with 'X'
    winner = false; // winner set to false, no winner yet
    tie = false; // tie set to false
    render(); // calling the render function 
};

/*----------------------------- Event Listeners -----------------------------*/

