
let player;
let platforms;

// Initialize board and player
function startGame(){
    board.start();
    player = new Player(30, 30, 0, 0);
}


// Board object and functions
const board = {
    canvas: document.createElement('canvas'),
    // Draw canvas and add eventListeners
    start: function() {
        this.canvas.width = 600;
        this.canvas.height = 270;
        this.canvas.id = 'board'
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateBoard, 20);

        window.addEventListener('keydown', (e) => {
            board.keys = board.keys || [];
            board.keys[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            board.keys[e.key] = false
        })
    },
    clear: function() {
        this.context.clearRect(0 ,0, this.canvas.width, this.canvas.height)
    }
}

function updateBoard(){
    board.clear();
    player.speedX = 0;
    player.speedY = 0;
    if(board.keys && board.keys['ArrowUp']) jump();
    if(board.keys && board.keys['ArrowRight']) moveRight();
    if(board.keys && board.keys['ArrowLeft']) moveLeft();
    platforms.update();
    player.newPos();
    player.update();
}





// Player functions
class Player {
    constructor(){
        this.width = width;
        this.height = height;
        this.speed = 5;
        this.weight = 5;
        this.x_acceleration = 0;
        this.y_acceleration = 0;
        this.x = x;
        this.y = y;
        this.bottom = board.canvas.height - this.height
        this.gravity = 1;
        this.gravitySpeed = 0;
    }
    isFalling(){
        return this.y_acceleration > 0;
    }

    isOnPlatform(platform){
        return platform.y <= this.y &&
            this.y <= platform.y + board.canvas.height
    }

    update = function() {
        let ctx = board.context;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    newPos() {
        if(this.crashWith(platforms)){
            stopMoveY();
        }
        // Gravity kicks in when player is in the air
        if(this.y < this.bottom || !this.crashWith(platforms)){
            this.gravitySpeed += this.gravity
        }
        // When player crosses the left or right borders of the playing area the player resets to the opposite end of the screen
        if(this.x > board.canvas.width){
            this.x = 0
        }
        if(this.x < 0 - this.width){
            this.x = board.canvas.width - this.width
        }
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottomOrObject();
    }

    hitBottomOrObject(){
        if(this.y > this.bottom){
            this.y = this.bottom;
        }
    }

    crashWith(object){
        let collision = false;
        let playerLeft = this.x;
        let playerRight = this.x + this.width
        let playerTop = this.y;
        let playerBottom = this.y + this.height;
        let objectLeft = object.x;
        let objectRight = object.x + object.width;
        let objectTop = object.y;
        let objectBottom = object.x + object.height;

        if((playerBottom < objectTop && playerRight < objectLeft && playerLeft < objectRight)){
            collision = true
        }
        return collision;
    }
}

function moveRight() {
    player.speedX = 10;
}
function moveLeft() {
    player.speedX = -10;
}
function stopMoveX() {
    player.speedX = 0
}
function stopMoveY() {
    player.speedX = 0
    player.gravity = 0;
    player.gravitySpeed = 0;
}
function jump(){
    if(player.y === board.canvas.height - player.width){
        player.gravitySpeed = -10;
        player.speedY -= 50
    }
}

startGame();