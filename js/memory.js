const cards = document.querySelectorAll('.card');

var flippedCards = [];


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
        var timeLeft = 60;
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
        setTimeout(endScreen, 60000);
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

// game start
const deck = document.querySelector(".playarea");

function startGame() {
    let resetFlip = document.querySelectorAll(".card");
    for (let i = 0; i < resetFlip.length; i++) {
        resetFlip[i].style.transform = "rotateY(0deg)";
        moves = 0;
        counter.innerHTML = moves;
        document.getElementById("time-remaining").textContent = 60;
        flippedCards = [];
    }
    setTimeout(function () {
        shuffle();
    }, 750);
}

function ready() {
    let overlayTexts = Array.from(document.getElementsByClassName('overlay-text'));
    overlayTexts.forEach(overlayText => {
        overlayText.addEventListener('click', () => {
            setTimeout(function () {
                overlayText.parentElement.classList.remove('visible');
            }, 750);
            startGame();
        });
    });
}


// Card randomiser
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}


// Card flip
let hasFlippedCard = false;
let lock = false;
let firstCard, secondCard;

function cardFlip() {
    if (lock) return;
    if (this === firstCard) return;
    if (this.className === "card") {
        if (this.style.transform == "rotateY(180deg)") {
            this.style.transform = "rotateY(0deg)";
        } else {
            this.style.transform = "rotateY(180deg)";
        }
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            firstCard.classList.add('unmatched');
        } else {
            secondCard = this;           
            secondCard.classList.add('unmatched');
            cardMatch();
            countUp();
        }
    }
}
//card matching
function cardMatch() {
    if (firstCard.type === secondCard.type) {
        disable();
    } else {
        unflip();
    }
}

function disable() {
    firstCard.removeEventListener('click', cardFlip)
    secondCard.removeEventListener('click', cardFlip)
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('unmatched');
        secondCard.classList.remove('unmatched');
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        cardReset();
    }, 750);
}

function unflip() {
    lock = true;
        setTimeout(() => {
        firstCard.style.transform = "rotateY(0deg)";
        secondCard.style.transform = "rotateY(0deg)";
        firstCard.classList.remove('unmatched');
        secondCard.classList.remove('unmatched');
            setTimeout(() => {
            cardReset();
        }, 400);
    }, 1500);
}

function cardReset() {
    hasFlippedCard = false;
    lock = false;
    firstCard = null;
    secondCard = null;
}

cards.forEach(card => card.addEventListener('click', cardFlip));


// Page Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}