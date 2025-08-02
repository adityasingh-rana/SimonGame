let isGameStarted = false;
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let heading = document.querySelector("h2");
let btn = null;
let color = null;
let scores = [];

const audio = document.querySelector("#audio");
const buttonColors = ["aqua", "blue", "green", "yellow"];


document.addEventListener("keypress", function () {
    if (!isGameStarted) {
        isGameStarted = true;
        levelUp();
    }
});

let buttons = document.querySelectorAll(".btn");


for (button of buttons) {
    button.addEventListener("click", btnPress );
};

function levelUp() {
    level++;
    heading.textContent = `Level ${level}`;
    let randomIndex = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomIndex];
    let btn = document.querySelector(`.${randomChosenColor}`);
    gamePattern.push(randomChosenColor);
    userClickedPattern = [];
    flashButton(btn);
};

function flashButton(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);

}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);

}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.classList[1];
    userClickedPattern.push(userColor);

    checkAns(userClickedPattern.length - 1);
};

function checkAns(idx) {
    if (userClickedPattern[idx] === gamePattern[idx]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(levelUp, 300);
        }
    } else {
        audio.currentTime = 0;
        audio.play();
        document.body.classList.add("gameOver");
        setTimeout(() => {
            document.body.classList.remove("gameOver");
        }, 500);
        let score = level - 1;
        scores.push(score);
        calcHighestScore();
        heading.innerHTML = `Highest Score: ${highestScore} <br><br> Game Over! your score was <b>${score}</b>. <br> Press any key to restart the game.`;

        reset();

    };
};

function reset() {
    isGameStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
};

let highestScore = -1;
function calcHighestScore() {
    for ( score of scores){
        if(score > highestScore){
            highestScore = score;
        };
    };
};