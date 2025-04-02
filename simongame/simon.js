const green = document.getElementById("btngreen");
green.addEventListener("click", () => playerTurn(green.id));
const red = document.getElementById("btnred");
red.addEventListener("click",  () => playerTurn(red.id));
const yellow = document.getElementById("btnyellow");
yellow.addEventListener("click",  () => playerTurn(yellow.id));
const blue = document.getElementById("btnblue");
blue.addEventListener("click",  () => playerTurn(blue.id));
const boardColors = document.getElementsByClassName("boardColor");

const initGame = document.getElementById("initBtn");
initGame.addEventListener("click", startGame);
const readyInfo = document.getElementById("readyText");
const playerInput = document.getElementById("inputName");
let playerName;
const lvlInfo = document.getElementById("lvlText");

const boxScores = document.getElementById("scoreBox");

let colorBtns = ["btngreen", "btnred", "btnyellow", "btnblue"];
let sequence = [];
let playerSequence = [];
let lvl = 1;

function createSequence(){
    enableColorBtns();
    lvlInfo.style.color = "white";
    lvlInfo.innerText = `Nivel ${lvl} (${playerName})`;

    for (i=0; i<lvl; i++){
        let randomColor = Math.floor(Math.random() * colorBtns.length);
        sequence.push(colorBtns[randomColor]);
    }

    console.log(sequence)
    showSequence();
}

let showColor = 0;

async function showSequence(){
    await showSingleColor(showColor)
    showColor++

    if (showColor == sequence.length){
        showColor = 0;
        return;
    }
    else{
        showSequence();
    }
}

async function showSingleColor(singleColor){
    document.getElementById(sequence[singleColor]).classList.add("showColor");

    await setTimeout(() => {
        document.getElementById(sequence[singleColor]).classList.remove("showColor");
    }, 1000);
}

function playerTurn(color){
    playerSequence.push(color);

    if (playerSequence.length == sequence.length){
        disableColorBtns();
        checkSequences();
    }
}

function checkSequences(){
    for (indexColor=0; indexColor<playerSequence.length; indexColor++){
        if (playerSequence[indexColor] != sequence[indexColor]){
            lvlInfo.innerText = "HAS PERDIDO";

            saveScore();
            return;
        }
        else{
            if (indexColor == playerSequence.length - 1){
                lvlInfo.style.color = "green";
                lvlInfo.innerText = "NIVEL SUPERADO"

                setTimeout(() => {
                    nextlvl();
                }, 1000);
            }
        }
    }
}

function nextlvl(){
    lvl++;
    sequence = [];
    playerSequence = [];
    
    createSequence();
}

function startGame(){
    if (playerInput.value == ""){
        lvlInfo.style.color = "red";
        lvlInfo.innerText = "Introduce tu nombre, por favor";

        return;
    }

    playerName = playerInput.value;

    playerInput.style.display = "none";
    initGame.style.display = "none";
    createSequence();
}

function disableColorBtns(){
    const disableBtns = Array.from(boardColors);

    disableBtns.forEach(btn => {
        btn.classList.add("disabledColor")
    });
}

function enableColorBtns(){
    const enableBtns = Array.from(boardColors);

    enableBtns.forEach(btn => {
        btn.classList.remove("disabledColor")
    });
}

function saveScore(){
    playerName = playerName.toLowerCase();

    if (!localStorage.getItem(playerName)){
        const newPlayerScore = [];
        newPlayerScore.push(lvl);
        localStorage.setItem(playerName, JSON.stringify(newPlayerScore));
    }
    else{
        const playerScore = JSON.parse(localStorage.getItem(playerName));
        playerScore.push(lvl);
        localStorage.setItem(playerName, JSON.stringify(playerScore));
    }

    buildChart();
}

function buildChart(){
    boxScores.innerHTML = " <canvas id='miGrafico'></canvas>";
    const ctx = document.getElementById('miGrafico').getContext('2d');

    const playerScoring = JSON.parse(localStorage.getItem(playerName));
    const playerNumGames = [];
    let numGame = 1;
    playerScoring.forEach(playerScore => {
        playerNumGames.push(`Partida ${numGame++}`);
    });

    const datos = {
        labels: playerNumGames,
        datasets: [{
            label: `Puntuación de ${playerName}`,
            data: playerScoring,
            backgroundColor: 'green',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        ]
    };
    
    const miGrafico = new Chart(ctx, {
        type: 'line', // Tipo de gráfico: 'bar', 'line', 'pie', etc.
        data: datos,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000, // Duración en milisegundos
                easing: 'easeOutBounce' // Tipo de animación
            }
        }
    });

    buildHighScoreList();
}

function buildHighScoreList(){
    const scoreList = document.createElement("ol");
    scoreList.classList.add("scoreList");
    
    const playerNames = Object.keys(localStorage);
    const playerScores = Object.values(localStorage);
    const scoreBoard = [];

    for (i=0; i<playerNames.length; i++){
        const playerHighScore = {};

        playerHighScore.name = playerNames[i];
        
        let playerScore = playerScores[i];
        console.log(Math.max(...playerScore));
        playerHighScore.score = maxScore;

        scoreBoard.push(playerHighScore);
    }

    console.log(scoreBoard);

    boxScores.appendChild(scoreList);
}

disableColorBtns();
