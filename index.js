var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = -.5;
var dy = -.5
var ballRadius = 10;
var color = "rgba(0, 149, 221, 1)"

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function randNum() {
  return parseInt(Math.random()*255)
}

function randRGBA() {
  color = `rgba(${randNum()}, ${randNum()}, ${randNum()}, 1)`
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall()

  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
    randRGBA()
  }

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    randRGBA() 
  }

  x += dx;
  y += dy;

}

setInterval(draw, 10);
