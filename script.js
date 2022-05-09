// ---------------- VARIABLES -----------------


// Number of target
let apparitionNumber = 4;

let timeStart;
let timeEnd;
let averageTime;
let averageResult;
let bestScore;
let timeResult = [];
let apparitionCount;
let errorClic = 0;

// Appear speed
let minTimeAppear = 500;
let maxTimeAppear = 2000;

// --------------- SELECTIONS -----------------

const gameContainer = document.getElementById("game-container");
const gameText = document.getElementById("game-text");
const targetCount = document.getElementById("target-count");
const startBtn = document.getElementById("start-btn");
const displayBestScore = document.getElementById("best-score");


// Prepare best-score in local Storage

if (localStorage.getItem("bestScore") === null) {
    displayBestScore.innerHTML = "no score";
} else {
    displayBestScore.innerHTML = localStorage.getItem("bestScore") + "s";
}

// ----------- EVENTS LISTENER --------------

startBtn.addEventListener("click", function () {
    counterReset();
    startBtn.classList.add("stop-start");
    startBtn.disabled = true;
    startCount();
    setTimeout(function () {
        gameText.classList.remove("flex-active");
        createBall();
    }, 3500);
});

gameContainer.addEventListener("click", function (e) {
    const target = e.target;
    if (target.className === "clic-ball") {
        timeEnd = Date.now();
        averageTime = ((timeEnd - timeStart) / 1000).toFixed(2);
        timeResult.push(averageTime);
        averageResult = averageClic(timeResult);
        gameContainer.classList.add("valid-clic");
        setTimeout(function() {
            gameContainer.classList.remove("valid-clic");
        }, 300);

        if (apparitionCount === 1) {
            apparitionCount--;
            target.remove();
            targetCount.textContent = apparitionCount;
            restart();
            displayResult();
        }

        if (apparitionCount > 1) {
            target.remove();
            createBall();
            apparitionCount--;
            targetCount.textContent = apparitionCount;
        }
    }

    else {
        gameContainer.classList.add('invalid-clic');
        errorClic++;
        setTimeout(function() {
            gameContainer.classList.remove("invalid-clic");
            }, 300);
    }
})

// -------------- FUNCTIONS --------------

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function startCount() {
    gameText.classList.remove("result-display");
    gameText.textContent = "Ready"
    gameText.classList.add("flex-active");
    setTimeout(function () {
        gameText.textContent = "GO !"
    }, 2000);
}

function createBall() {
    const ball = document.createElement('div');
    ball.classList.add("clic-ball");
    ball.style.top = `${randomNumber(0, 595)}px`;
    ball.style.left = `${randomNumber(0, 1470)}px`;
    setTimeout(function () {
        gameContainer.appendChild(ball);
        timeStart = Date.now();
    }, randomNumber(minTimeAppear, maxTimeAppear))
}

function restart() {
    startBtn.classList.remove("stop-start");
    startBtn.textContent = "Restart";
    startBtn.disabled = false;
}

function counterReset() {
    timeResult = [];
    apparitionCount = apparitionNumber;
    errorClic = 0;
    targetCount.textContent = apparitionCount;
}

function averageClic(array) {
    let sum = 0;
    for (let entrie of array) {
        sum += +entrie;
    }
    return (sum / array.length).toFixed(2);
}

function displayResult() {
    if (bestScore === undefined) {
        bestScore = averageResult;
    }
    if (averageResult < bestScore) {
        bestScore = averageResult;
    }
    saveBestScore(bestScore);
    displayBestScore.innerHTML = localStorage.getItem("bestScore") + "s";
    gameText.innerHTML = `&#127919 Result: &#127919</br>
    - &#9201 Average time : ${averageResult}s.</br>
    - &#11088 Best score : ${localStorage.getItem("bestScore")}s.</br>
    - &#10060 Miss Clic : ${errorClic}.`
    gameText.classList.add("result-display");
    gameText.classList.add("flex-active");
}

function saveBestScore(entrie) {
    localStorage.setItem("bestScore", entrie);
}