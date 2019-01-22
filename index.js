var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Ball characteristics
var x = canvas.width/2;
var y = canvas.height/2;
var dx = -4;
var dy = -4
var ballRadius = 10;
var color = "rgba(0, 149, 221, 1)"

// Paddle characteristics
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleColor = "rgba(0, 149, 221, 1)"

// Keypad pressed characteristics
var rightPressed = false;
var leftPressed = false;

// Brick characteristics
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickColor = "rgba(0, 149, 221, 1)"

// Keep track of score
var score = 0;

// Keep track of lives
var lives = 3;

// Draw the bricks array with (0,0) x,y coordinates
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Draw bricks on screen in different positions
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
            var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = brickColor
            ctx.fill();
            ctx.closePath();
          }
       }
    }
}

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
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

// Draw score on canvas
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = randRGBA()
    ctx.fillText("Score: "+score, 8, 20);
}

// draw lives on canvas
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = randRGBA()
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// Return rand num between 0 - 255 for RGBA
function randNum() {
  return parseInt(Math.random()*255)
}

// redefine color
function randRGBA() {
  return `rgba(${randNum()}, ${randNum()}, ${randNum()}, 1)`
}


function draw() {
  // clears the canvas of previous drawn balls
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks()
  drawBall()
  drawPaddle()
  drawScore();
  drawLives()
  collisionDetection()

  // Changes x direction of the ball when it hits left or right of canvas
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    color = randRGBA()
  }

  // Changes y direction of the ball when it hits top or bottom of canvas
  if(y + dy < ballRadius) {
    dy = -dy;
    color = randRGBA()
  }
  // removes life if ball hits bottom on canvas
  else if (y + dy > canvas.height-ballRadius) {
    // responds to ball hitting paddle
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
      color = randRGBA()
      dy *= 1.1
      dx *= 1.1
      paddleColor = randRGBA()
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 5;
        dy = -5;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
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

  // smoother transition between frames
  requestAnimationFrame(draw);
}

// detects if ball has collided with brick - only draw bricks with status of 1
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status ==1) {
              if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0
                score++
                brickColor = randRGBA()
                color = randRGBA()
                if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                }
              }
            }
        }
    }
}

// Event listeners listening for key presses and moue moves
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

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

// responds to mouse moving event
function mouseMoveHandler(e) {
    // relativeX = distance between the canvas left edge and the mouse pointer
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX - paddleWidth/2 > 0 && relativeX + paddleWidth/2 < canvas.width) {
        // anchor mouse to middle of paddle
        paddleX = relativeX - paddleWidth/2;
    }
}

draw()
