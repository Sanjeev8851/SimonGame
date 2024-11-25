let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "purple", "orange"];

let start = false;
let level = 0;
let h2 = document.querySelector("h2");

// Start the game on key press
document.addEventListener("keypress", function () {
    if (!start) {
        console.log("game is started");
        start = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}


function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); 
        }
    } else {
        h2.innerHTML = `Game over! <b> Your Score ${level}</b> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        } , 1000);
        resetGame();
    }
}

// Function to handle leveling up and adding a new color to the sequence
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Choose a random button for the sequence
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn); // Flash the button for the sequence
}

// Function to handle user button presses
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1); // Check the user's input after every press
}

// Attach event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame(){
    start = false ;
    gameSeq = [];
    userSeq = [];
    level = 0 ;
}
