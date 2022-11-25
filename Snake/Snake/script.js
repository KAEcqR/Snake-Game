//canvas
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var canvasColor = "rgb(15, 15, 15)";

//snake head
var snakeX = blockSize * 1;
var snakeY = blockSize * 1;
var snakeColor = "yellow";

var velocityX = 0;
var velocityY = 0;

//snake body

var snakeBody = [];

//food
var foodX;
var foodY;
var foodColor = "red";

var score = 0;
var score2 = 0;
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
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][1] && snakeY == snakeBody[i][0]) {
            gameOver = true;
        }
    }

    if(gameOver == true){
        cover.style.display = "flex";
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

resetbtn.addEventListener("click", function(){
    window.location.reload();
});

resetbtn2.addEventListener("click", function(){
    window.location.reload();
});