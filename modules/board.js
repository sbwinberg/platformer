
let canvas = document.getElementById('board');
let ctx = canvas.getContext('2d');



let player;

// Initialize board and player
function startGame(){
    board.start()
    player = new Player(30, 30)
}


const board = {
    canvas: canvas,
    // Draw canvas and add eventListeners
    start: function() {
        this.canvas.width = 600;
        this.canvas.height = 270;
        this.context = ctx;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateBoard, 500);
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
    if(board.keys['ArrowRight']) moveRight();
    if(board.keys['ArrowLeft']) moveLeft();
    player.newPos();
    player.update();
}






function Player(width, height) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = 0;
    this.y = canvas.height - this.width;
    this.update = function() {
        ctx = board.context;
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function moveRight() {
    player.speedX = 10;
}

function moveLeft() {
    player.speedX = -10;
}

function stopMove() {
    player.speedX = 0
}

function jump(){
    player.speedY -= 1
}

startGame();