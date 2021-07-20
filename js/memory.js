const card = document.querySelectorAll('.card');


// Clicker Counter

let moves = document.querySelectorAll('.card');
let counter = document.querySelector('#counter');

for (var i = 0; i < moves.length; i++) {
    moves[i].addEventListener('click', countUp);
}

function countUp() {
    counter.innerHTML++;
}


// timer
var timeLeft = document.getElementsByClassName('overlay-text');
for (var i = 0; i < timeLeft.length; i++) {
    timeLeft[i].addEventListener('click', function () {
        var timeLeft = 5;
        var gameTimer = setInterval(function () {
            timeLeft--;
            document.getElementById('time-remaining').textContent = timeLeft;
            if (timeLeft <= 0)
                clearInterval(gameTimer);
        }, 1000);
    });
}

var reset = document.getElementsByClassName('overlay-text');
for (var i = 0; i < reset.length; i++) {
    reset[i].addEventListener('click', function () {
        setTimeout(endScreen, 5000);
    });
}


// conditions

function endScreen() {
    gameOver();

}

function gameOver() {
    document.getElementById('game-over-text').classList.add('visible');
}

function victory() {
    document.getElementById('win-text').classList.add('visible');
}


`document.getElementById('game-start').addEventListener("click", function(){
    
});`;


// game start
const deck = document.querySelector(".playarea");

function startGame() {
    let resetFlip = document.querySelectorAll(".card");
    for (let i = 0; i < resetFlip.length; i++) {
        resetFlip[i].style.transform = "rotateY(0deg)";
    }
    setTimeout(function () {
        shuffle();
        moves = 0;
        counter.innerHTML = moves;
        document.getElementById("time-remaining").textContent = 5;


    }, 750);
}

function ready() {
   // let overlays = Array.from(document.getElementsByClassName('overlay'));
    let overlayTexts = Array.from(document.getElementsByClassName('overlay-text'));
`
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            setTimeout(function () {
                overlay.classList.remove('visible');
            }, 800);
        });
    });
}`
    overlayTexts.forEach(overlayText => {
        overlayText.addEventListener('click', () => {
            overlayText.parentElement.classList.remove('visible');
            startGame();
        });
    });
}


// Card randomiser

function shuffle() {
    card.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}


// Card flip function

function flip(event) {
    var element = event.currentTarget;
    if (element.className === "card") {
        if (element.style.transform == "rotateY(180deg)") {
            element.style.transform = "rotateY(0deg)";
        } else {
            element.style.transform = "rotateY(180deg)";
        }
    }
}



if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}