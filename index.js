var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Ball characteristics
var x = canvas.width/2;
var y = canvas.height/2;
var dx = -.5;
var dy = -.5
var ballRadius = 10;
var color = "rgba(0, 149, 221, 1)"

// Paddle characteristics
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

// Keypad pressed characteristics
var rightPressed = false;
var leftPressed = false;

// Draw ball on screen
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on screen
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Return rand num between 0 - 255 for RGBA
function randNum() {
  return parseInt(Math.random()*255)
}

// redefine color -> executed every time the ball bounces off the wall
function randRGBA() {
  color = `rgba(${randNum()}, ${randNum()}, ${randNum()}, 1)`
}


function draw() {
  // clears the canvas of previous drawn balls
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall()
  drawPaddle()

  // Changes y direction of the ball when it hits top or bottom of canvas
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
    randRGBA()
  }

  // Changes x direction of the ball when it hits left or right of canvas
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    randRGBA()
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 5;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 5;
  }

  // updates x position by dx && y position by dy
  x += dx;
  y += dy;

}

// Event listeners listening for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// executes on keydown press -> changes rightPressed or leftPressed to true
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

// executes on keyup press -> changes rightPressed or leftPressed to false
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

setInterval(draw, 10);
