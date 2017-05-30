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

function Ball(x, y, width, height, speedx, speedy){
    this.ballx = x;
    this.bally = y;
    this.width = width;
    this.height = height;
    this.speedx = speedx;
    this.speedy = speedy;
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
    if (keypress == 38 && this.paddley > 0) {
        this.paddley = this.paddley - this.speed;
    } else if (keypress === 40 && this.paddley < 380) {
        this.paddley = this.paddley + this.speed;
    }
};

Ball.prototype.render = function() {
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(this.ballx, this.bally, this.width, this.height);
};

var canvas = new Canvas(0,0,640,480);
var player = new Paddle(10,190,20,100,10);
var computer = new Paddle(610,190,20,100,5);
var ball = new Ball(320,240,20,20,(Math.floor(Math.random()*10)-5),Math.floor(Math.random()*10)-5);


var collision = function(ball, computer, player) {
    if (ball.ballx <=-20 || ball.ballx >=700) {
        ball.speedx = (Math.floor(Math.random()*10)-5);
        ball.speedy = (Math.floor(Math.random()*10)-5);
        ball.ballx = 320;
        ball.bally = 240;
    } else if (ball.ballx < computer.paddlex + computer.width &&
        ball.ballx + ball.width > computer.paddlex &&
        ball.bally < computer.paddley + computer.height &&
        ball.height + ball.bally > computer.paddley){
        ball.speedx *= -1;
    } else if (ball.ballx < player.paddlex + player.width &&
        ball.ballx + ball.width > player.paddlex &&
        ball.bally < player.paddley + player.height &&
        ball.height + ball.bally > player.paddley){
        ball.speedx *= -1;
    } else if (ball.bally <= 0 || ball.bally >= 460) {
        ball.speedy *= -1;
    } 
};

Ball.prototype.serve = function() {
    this.ballx += this.speedx;
    this.bally += this.speedy;
    collision(ball, computer, player);
};

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
    ball.serve()
}

var moveplayer = function(key) {
    player.move(key);
};

window.onload = function() {
     window.addEventListener('keydown', moveplayer);
     step();
};