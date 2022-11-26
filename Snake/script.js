//canvas
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var canvasColor = "rgb(15, 15, 15)";

//snake head
var snakeX = blockSize * 10;
var snakeY = blockSize * 10;
var snakeColor = "yellow";

var velocityX = 0;
var velocityY = 0;

//snake body

var snakeBody = [];

//food
var foodX;
var foodY;
var foodColor = "red";

//sounds
var eat = new Audio('img/eat.mp3');
var lose = new Audio('img/lose.mp3');
var left = new Audio('img/left.mp3');
var right = new Audio('img/right.mp3');
var up = new Audio('img/up.mp3');
var bot = new Audio('img/bot.mp3');
var reset = new Audio('img/reset.mp3')

var score = 0;
var resetbtn = document.querySelector(".resetbtn");
var resetbtn2 = document.querySelector(".resetbtn2");
var title = document.querySelector(".title");
var cover = document.querySelector(".cover");

var gameOver = false;

window.onload = function(){
    board = document.querySelector("#board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000/10);
}

function update(){
    context.fillStyle = canvasColor;
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        if(gameOver != true){
            score += 1;
            document.querySelector(".score").innerHTML = score;
            snakeBody.push([foodX, foodY]);
            placeFood();
            eat.play();
        }
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i -1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = snakeColor;
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++ ){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    //game Over


    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        snakeY = 10;
        snakeX = 10;
        velocityX = 0;
        velocityY = 0;
        snakeBody = 0;
        lose.play();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][1] && snakeY == snakeBody[i][0]) {
            gameOver = true;
            snakeY = 10;
            snakeX = 10;
            velocityX = 0;
            velocityY = 0;
            snakeBody = 0;
            lose.play();
        }
    }

    if(gameOver == true){
        setgameover();
    }
}

function setgameover(){
    cover.style.display = "flex";
    document.querySelector(".score2").innerHTML = score;
}

function changeDirection(e) {
    if(gameOver != true){
        if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
            velocityY = -1;
            up.play();
        }
        else if (e.code == "ArrowDown" && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
            bot.play();
        }
        else if (e.code == "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
            left.play();
        }
        else if (e.code == "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
            right.play();
        }
    }
}
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

resetbtn.addEventListener("click", function(){
    reset.play();
    setTimeout(() => {window.location.reload();}, 300);
});

resetbtn2.addEventListener("click", function(){
    reset.play();
    setTimeout(() => {window.location.reload();}, 300);
});