// jshint esversion: 6

var cards = document.querySelectorAll('.card');

var flippedCards = [];


// Clicker Counter
var moves = document.querySelectorAll('.card');
var counter = document.querySelector('#counter');

function countUp() {
    counter.innerHTML++;
}


// timer
var gameTimer;

var timeLeft = document.getElementsByClassName('overlay-text');
for (var i = 0; i < timeLeft.length; i++) {
    timeLeft[i].addEventListener('click', function() {
        var timeLeft = 60;
        gameTimer = setInterval(function() {
            timeLeft--;
            document.getElementById('time-remaining').textContent = timeLeft;
            if (timeLeft <= 0)
                gameOver();
        }, 1000);
    });
}


// conditions

function gameOver() {
    document.getElementById('game-over-text').classList.add('visible');
    clearInterval(gameTimer);
}

function victory() {
    document.getElementById('win-text').classList.add('visible');
    clearInterval(gameTimer);
}


// Card randomiser
function shuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}


// Card flip
var hasFlippedCard = false;
var lock = false;
var firstCard, secondCard;

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
    lock = true;
    setTimeout(function() {
        firstCard.classList.remove('unmatched');
        secondCard.classList.remove('unmatched');
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        if (document.querySelectorAll(".card.matched").length === cards.length) {
            victory();
            clearInterval(gameTimer);
        } else {
            cardReset();
        }
    }, 250);
}

function unflip() {
    lock = true;
    setTimeout(function() {
        firstCard.style.transform = "rotateY(0deg)";
        secondCard.style.transform = "rotateY(0deg)";
        firstCard.classList.remove('unmatched');
        secondCard.classList.remove('unmatched');
        setTimeout(function() {}, 400);
        cardReset();
    }, 800);
}

function cardReset() {
    hasFlippedCard = false;
    lock = false;
    firstCard = undefined;
    secondCard = undefined;
}

cards.forEach(card => card.addEventListener('click', cardFlip));


// game start


function startGame() {
    document.querySelectorAll(".card").forEach((el) => {
        el.style.transform = "rotateY(0deg)";
        el.classList.remove("unmatched");
        el.classList.remove("matched");
    });
    moves = 0;
    counter.innerHTML = moves;
    document.getElementById("time-remaining").textContent = 60;
    flippedCards = [];
    cardReset();
    setTimeout(function() {
        shuffle();
    }, 300);
}

function ready() {
    var overlayTexts = Array.from(document.getElementsByClassName('overlay-text'));
    overlayTexts.forEach(overlayText => {
        overlayText.addEventListener('click', function() {
            setTimeout(function() {
                overlayText.parentElement.classList.remove('visible');
            }, 1000);
            startGame();
        });
    });
}


// Page Load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}