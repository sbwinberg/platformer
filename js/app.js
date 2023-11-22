const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4

}

const floorCollision2D = []
for (let i = 0; i < floorCollision.length; i+=36){
    floorCollision2D.push(floorCollision.slice(i, i+36))
}

const collisionBlocks = []
floorCollision2D.forEach((row) => {
    row.forEach(symbol => {
        if(symbol === 14) {
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: 0,
                    y: 0,
                },
        }))
        }
    })
})

const gravity = 0.2;

const player = new Player({
    x: 0,
    y: 0
});
const player2 = new Player({
    x: 300,
    y: 100
});

c.fillStyle = 'red';
c.fillRect(200, 100, 100, 100);

let y = 100;
let y2 = 100;

const keys = {
    d : {
        pressed: false
    },
    a : {
        pressed: false
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: '../img/background.png'
})

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0,0,canvas.width,canvas.height);

    c.save()
    c.scale(4,4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    c.restore()

    player.update();
    player2.update();

    player.velocity.x = 0
    if(keys.d.pressed) player.velocity.x = 5
    else if (keys.a.pressed) player.velocity.x = -5
}

animate()

window.addEventListener('keydown', () => {
    switch(event.key) {
        case 'd': 
            keys.d.pressed = true
            break
        case 'a': 
            keys.a.pressed = true
            break
        case 'w': 
            player.velocity.y = -10;
            break
    }
})

window.addEventListener('keyup', () => {
    switch(event.key) {
        case 'd': 
            keys.d.pressed = false
            break
        case 'a': 
            keys.a.pressed = false
            break
    }
})