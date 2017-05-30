var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

function Canvas(x, y, width, height){
    this.canvasx = x;
    this.canvasy = y;
    this.width = width;
    this.height = height;
}
    
function Paddle(x, y, width, height, speed) {
    this.paddlex = x;
    this.paddley = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
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
};

Paddle.prototype.render = function() {
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(this.paddlex, this.paddley, this.width, this.height);
};

Paddle.prototype.move = function(key) {
    var keypress = key.keyCode;
    if (keypress == 38 || keypress == 87 && this.paddley > 0) {
        this.paddley = this.paddley - this.speed;
    } else if (keypress === 40 || keypress == 83 && this.paddley < 380) {
        this.paddley = this.paddley + this.speed;
    }
}

Ball.prototype.render = function() {
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(this.ballx, this.bally, this.width, this.height);
};
var canvas = new Canvas(0,0,640,480);
var player = new Paddle(10,190,20,100,5);
var computer = new Paddle(610,190,20,100,5);
var ball = new Ball(320,240,20,20);

var render = function() {
    canvas.render();
    player.render();
    computer.render();
    ball.render();
};

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };
              
function step(){
    render();
    animate(step);
}

var moveplayer = function(key) {
    player.move(key);
};

window.onload = function() {
     step();
     window.addEventListener('keydown', moveplayer);
};
