const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


// Player
const player = {
    x: 50,
    y: 50,
    size: 20,
    speed: 4
};

// Coin
let coin = {
    x: randomPosition(580),
    y: randomPosition(380),
    size: 10
};

let score = 0;
const keys = {};

// Input
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update logic
function update() {
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;

    // Collision with coin
    if (isColliding(player, coin)) {
        score++;
        coin.x = randomPosition(580);
        coin.y = randomPosition(380);
    }

    // Keep player in bounds
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Coin
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
    ctx.fill();

    // Score
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Helpers
function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

function isColliding(a, b) {
    return (
        a.x < b.x + b.size &&
        a.x + a.size > b.x &&
        a.y < b.y + b.size &&
        a.y + a.size > b.y
    );
}

// Start game
gameLoop();
