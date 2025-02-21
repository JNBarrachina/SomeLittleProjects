const start = document.getElementById("sBox")
start.addEventListener("click", startGame);
addEventListener("keydown", direction);

let mHead = 1;
let speed = 120;
let points = 0;
let maxFood = 400;
let food = [];
let snakeColor = "greenyellow";
let prevDir = "ArrowRight";

function startGame(event) {
    let initID = parseInt(event.target.id);
    let snake = [];
    snake.push(initID, initID - 1);

    paintSnake(snake);
    addFood(maxFood, snake);
    movement(snake);
}

function movement(snake) {

    setInterval(() => {
        deleteSnake(snake);
        for (let e = snake.length - 1; e > 0; e--){
            snake[e] = snake[e - 1];
        }
        snake[0] = snake [0] + mHead;

        checkLimits(snake);
        autokill(snake);
        paintSnake(snake);
        eatFood(snake, food);
    }, speed);
}

function deleteSnake(snake) {
    for (let d = 0; d < snake.length; d++){
        document.getElementById(snake[d]).style.backgroundColor = "#273849";
    }

    return;
}

function paintSnake(snake) {
    for (let p = 0; p < snake.length; p++){
        document.getElementById(snake[p]).style.backgroundColor = snakeColor;
    }
    
    return;
}


function direction(event){
    let dir = event.key;

    switch (dir) {
        case "ArrowUp":
            if (prevDir == "ArrowDown"){
                gameover();
            }
            else{
                prevDir = "ArrowUp";
                mHead = -20;
                movement(snake);
                break;
            }
        case "ArrowDown":
            if (prevDir == "ArrowUp"){
                gameover();
            }
            else{
                prevDir = "ArrowDown";
                mHead = 20;
                movement(snake);
                break;
            }   
        case "ArrowLeft":
            if (prevDir == "ArrowRight"){
                gameover();
            }
            else{
                prevDir = "ArrowLeft";
                mHead = -1;
                movement(snake);
                break;
            }   
        case "ArrowRight":
            if (prevDir == "ArrowLeft"){
                gameover();
            }
            else{
                prevDir = "ArrowRight";
                mHead = 1;
                movement(snake);
                break;
            }   
        default:
            break;
    }
}
function addFood(maxFood, snake) {
    let foodpiece;

    do {
        foodpiece = Math.floor(Math.random() * maxFood);
    } while (snake.includes(foodpiece));

    food.push(foodpiece);
    document.getElementById(food).style.backgroundColor = "red";
}

function eatFood(snake, food){

    for (let f = 0; f < food.length; f++){
        if (snake[0] == food[f]){
            food.splice(f, 1);
            addFood(maxFood,snake);
            growSnake(snake);

            score();
        }
    }
}

function growSnake(snake){
    let gap = snake[snake.length - 1] - snake[snake.length - 2];
    snake.push(snake[snake.length - 1] + gap);

    return;
}

function checkLimits(snake){
    if (snake[0] < 0 || snake[0] > 400){
        gameover();
    }
    else if ((snake[0] % 20 == 0) && (mHead == 1)){
        gameover();
    }
    else if ((snake[0] % 20 == 19) && (mHead == -1)){
        gameover();
    }
    else{
        return;
    }
}

function autokill(snake, mHead){
    for (let k = 0; k < snake.length - 1; k++){
        if ((snake[0] + mHead) == snake[k]){
            gameover();
        }
    }
}

function score(){
    points += 10;
    document.getElementById("pInfo").innerText = "Points: " + points;
}

function gameover(){
    alert("YOU LOOSE\nPoints: " + points);
    location.reload();
}