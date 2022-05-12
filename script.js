// ---------------- VARIABLES -----------------


// Number of targets
let apparitionNumber = 10;

let timeStart;
let timeEnd;
let averageTime;
let averageResult;
let apparitionCount;
let timeResult = [];
let errorClick = 0;
let bestScore = localStorage.getItem("bestScore");
let ballWidth = 30;

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
    if (target.classList.contains("click-ball")) {        
        timeEnd = Date.now();
        averageTime = timeEnd - timeStart;
        timeResult.push(averageTime);
        averageResult = averageClick(timeResult);
        gameContainer.classList.add("valid-click");
        setTimeout(function() {
            gameContainer.classList.remove("valid-click");
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
    } else {
        gameContainer.classList.add('invalid-click');
        errorClick++;
        setTimeout(function() {
            gameContainer.classList.remove("invalid-click");
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


    ball.classList.add("click-ball");
    ball.style.top = `${randomNumber(0, gameContainer.clientHeight - ballWidth)}px`;
    ball.style.left = `${randomNumber(0, gameContainer.clientWidth - ballWidth)}px`;
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
    errorClick = 0;
    targetCount.textContent = apparitionCount;
}

function averageClick(array) {
    let sum = 0;
    for (let entrie of array) {
        sum += +entrie;
    }
    return ((sum / array.length) / 1000).toFixed(2);
}

function saveBestScore(entrie) {
    localStorage.setItem("bestScore", entrie);
}

function displayResult() {
    if (bestScore === undefined || bestScore === null) {
        bestScore = averageResult;
    } else if (averageResult > localStorage.getItem("bestScore")) {
        bestScore = localStorage.getItem("bestScore");
    } else {
        bestScore = averageResult;
    }
    saveBestScore(bestScore);
    displayBestScore.innerHTML = localStorage.getItem("bestScore") + "s";
    gameText.innerHTML = `&#127919 Result: &#127919</br>
    - &#9201 Average time : ${averageResult}s</br>
    - &#11088 Best score : ${localStorage.getItem("bestScore")}s</br>
    - &#10060 Miss Click : ${errorClick}`
    gameText.classList.add("result-display");
    gameText.classList.add("flex-active");
}
