var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

function Canvas(x, y, width, height){
    this.canvasx = x;
    this.canvasy = y;
    this.width = width;
    this.height = height;
}
    
function Paddle(x, y, width, height) {
    this.paddlex = x;
    this.paddley = y;
    this.width = width;
    this.height = height;
}

function Ball(x, y, width, height){
    this.ballx = x;
    this.bally = y;
    this.width = width;
    this.height = height;
}

Canvas.prototype.render = function() {
    context.beginPath();
    context.fillStyle = 'gray';
    context.fillRect(this.canvasx, this.canvasy, this.width, this.height);
}

Paddle.prototype.render = function() {
    context.beginPath();
    context.fillStyle = 'black'
    context.fillRect(this.paddlex, this.paddley, this.width, this.height);
}

Ball.prototype.render = function() {
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(this.ballx, this.bally, this.width, this.height);
}

var canvas = new Canvas(0,0,640,480);
var player = new Paddle(10,190,20,100);
var computer = new Paddle(610,190,20,100);
var ball = new Ball(320,240,20,20);

var render = function() {
    canvas.render();
    player.render();
    computer.render();
    ball.render();
}


window.onload =function() {
    render();
}
