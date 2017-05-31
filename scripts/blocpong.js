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

function Ball(x, y, width, height, speedx, speedy) {
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
        this.paddley -= this.speed;
    } else if (keypress === 40 && this.paddley < 380) {
        this.paddley += this.speed;
    }
};

Paddle.prototype.update = function(ball) {
    if (ball.bally < this.paddley) {
        this.paddley-=this.speed;
    } else if (ball.bally > (this.paddley+80)){
        this.paddley+=this.speed;
    }
};

Ball.prototype.render = function() {
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(this.ballx, this.bally, this.width, this.height);
};

Ball.prototype.serve = function() {
    this.ballx += this.speedx;
    this.bally += this.speedy;
    this.collision(player, computer);
};

var playerscore = 0;
var computerscore = 0; 
Ball.prototype.collision = function(player, computer) {
    
    if (this.ballx < player.paddlex  + player.width  &&
            this.ballx + this.width > player.paddlex &&
            this.bally < player.paddley + player.height &&
            this.height + this.bally > player.paddley) {
            this.speedx *= -1;
            this.speedx += 1;
    } else if (this.ballx < computer.paddlex  + computer.width  &&
            this.ballx + this.width > computer.paddlex &&
            this.bally < computer.paddley + computer.height &&
            this.height + this.bally > computer.paddley) {
            this.speedx *= -1;
            this.speedx -= 1;
    } else if (this.bally <= 0 || this.bally >= 460) {
            this.speedy *= -1;
    } else if (this.ballx < 0) {
            document.getElementById("computerscore").innerHTML = (computerscore +=1);
            this.ballx=320;
            this.bally=240;
            this.speedx=(Math.floor(Math.random()*10)-5);
            this.speedy=(Math.floor(Math.random()*10)-5);
    } else if (this.ballx > 680) {
            document.getElementById("playerscore").innerHTML = (playerscore += 1);
            this.ballx=320;
            this.bally=240;
            this.speedx=(Math.floor(Math.random()*10)-5)
            this.speedy=(Math.floor(Math.random()*10)-5)
    }
};

var canvas = new Canvas(0,0,640,480);
var player = new Paddle(10,190,20,100,20);
var computer = new Paddle(610,190,20,100,3);
var ball = new Ball(320,240,20,20,(Math.floor(Math.random()*10)-5),(Math.floor(Math.random()*10)-5));

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
    ball.serve();
    computer.update(ball);
}

var moveplayer = function(key) {
    player.move(key);
};

window.onload = function() {
     window.addEventListener('keydown', moveplayer);
     step();
};