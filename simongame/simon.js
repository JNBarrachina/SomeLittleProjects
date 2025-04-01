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
const lvlInfo = document.getElementById("lvlText");

let colorBtns = ["btngreen", "btnred", "btnyellow", "btnblue"];
let sequence = [];
let playerSequence = [];
let lvl = 1;

function createSequence(){
    enableColorBtns();
    lvlInfo.innerText = `Nivel ${lvl}`;

    for (i=0; i<lvl; i++){
        let randomColor = Math.floor(Math.random() * colorBtns.length);
        sequence.push(colorBtns[randomColor]);
    }

    console.log(sequence)
    showSequence();
}

function showSequence(){
    sequence.forEach(color => {
        showSingleColor(color);
    });
}

function showSingleColor(color){
    document.getElementById(color).classList.add("showColor");

    setTimeout(() => {
        document.getElementById(color).classList.remove("showColor");
    }, 1000);
}


function playerTurn(color){
    playerSequence.push(color);
    console.log(playerSequence);

    if (playerSequence.length == sequence.length){
        disableColorBtns();
        checkSequences();
    }
}

function checkSequences(){
    for (indexColor=0; indexColor<playerSequence.length; indexColor++){
        if (playerSequence[indexColor] != sequence[indexColor]){
            lvlInfo.innerText = "HAS PERDIDO";

            setTimeout(() => {
                location.reload();
            }, 2000);
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
    initGame.style.display = "none";

    // let count =  3
    // setInterval(() => {
    //     readyInfo.innerText = count
    //     count--
    // }, 1000);

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

disableColorBtns();
