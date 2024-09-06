const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const jumpButton = document.getElementById('jumpButton');

let isJumping = false;
let score = 0;
let gameInterval;
let isGameRunning = false;
let cactusInterval;

function jump() {
    if (!isJumping && isGameRunning) {
        isJumping = true;
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            if (jumpCount < 15) {
                dino.style.bottom = `${parseInt(dino.style.bottom || '0') + 5}px`; // 增加跳跃高度
            } else if (jumpCount < 30) {
                dino.style.bottom = `${parseInt(dino.style.bottom) - 5}px`; // 增加下落速度
            } else {
                clearInterval(jumpInterval);
                isJumping = false;
                dino.style.bottom = '0px';
            }
            jumpCount++;
        }, 20);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

jumpButton.addEventListener('click', jump);

function moveCactus() {
    let position = 100;
    cactus.style.right = `${position}%`;
    cactusInterval = setInterval(() => {
        if (position < -10) {
            position = 100;
            cactus.style.right = `${position}%`;
            score++;
            scoreDisplay.textContent = `得分: ${score}`;
        } else {
            position -= 1;
            cactus.style.right = `${position}%`;
        }

        const dinoRect = dino.getBoundingClientRect();
        const cactusRect = cactus.getBoundingClientRect();
        
        // 调整碰撞检测的容差
        if (
            dinoRect.right > cactusRect.left + 10 &&
            dinoRect.left < cactusRect.right - 10 &&
            dinoRect.bottom > cactusRect.top + 5
        ) {
            gameOver();
        }
    }, 20);
}

function startGame() {
    isGameRunning = true;
    score = 0;
    scoreDisplay.textContent = '得分: 0';
    startButton.style.display = 'none';
    jumpButton.style.display = 'block';
    dino.style.left = '60%';
    moveCactus();
}

function gameOver() {
    isGameRunning = false;
    clearInterval(cactusInterval);
    alert('游戏结束!');
    startButton.style.display = 'block';
    jumpButton.style.display = 'none';
    cactus.style.right = '0%';
    dino.style.bottom = '0px';
    dino.style.left = '60%';
}

startButton.addEventListener('click', startGame);
