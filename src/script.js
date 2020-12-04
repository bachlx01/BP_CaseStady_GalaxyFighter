let l = console.log;
let cvGame = document.getElementById('myCanvas');
let ctxGame = cvGame.getContext('2d');
let cvBullet = document.getElementById('myCanvas2');
let ctxBullet = cvBullet.getContext('2d');
let cvIntro = document.getElementById('myCanvas3');
let ctxIntro = cvIntro.getContext('2d');
let cvExplosive = document.getElementById('myCanvas4');
let ctxExplosive = cvExplosive.getContext('2d');

// Create Initial value;
let game = new Game();
let musicBackground;
let soundGameOver = new Sound('./sounds/gameOver3.mp3');
let soundShoot = new Sound('./sounds/chiu.mp3');
let soundExplosive = new Sound('./sounds/Explosion+1.mp3');
let soundPlayerExplosive = new Sound('./sounds/Explosion+3.mp3');
let obstacles = [];
let scores = 0;
let highScore;
let callBackBulletMove;
let callBackMusicBackground;
window.addEventListener('keydown', function (event) {
    if (!game.ready) {
        if (event.keyCode == ENTER_KEY) {
            playReset();
            playReady();
        }
    }
});

//tạo màn hình bắt đầu game
ctxIntro.textAlign = "center";
ctxIntro.font = " 30px Arial ";
ctxIntro.fillStyle = 'wheat';
ctxIntro.fillText("GAME", CV_WIDTH / 2, CV_HEIGHT / 3);
ctxIntro.font = " bold 80px Impact ";
ctxIntro.fillStyle = 'yellow';
ctxIntro.fillText("SAVE THE WORLD", CV_WIDTH / 2, CV_HEIGHT / 2);
ctxIntro.font = " bold 20px Arial ";
ctxIntro.fillStyle = 'red';
ctxIntro.fillText("PRESS ENTER TO PLAY", CV_WIDTH / 2, CV_HEIGHT / 1.5);
ctxIntro.fillStyle = 'wheat';
ctxIntro.font = " bold 15px Arial ";
ctxIntro.fillText("PRESS CTRL TO SHOOT", CV_WIDTH / 2, CV_HEIGHT / 1.3);
ctxIntro.fillStyle = 'wheat';
ctxIntro.fillText("PRESS LEFT/RIGHT ARROW TO CHANGE DIRECTION", CV_WIDTH / 2, CV_HEIGHT / 1.2);

function getRandomHex() {
    return Math.floor(Math.random() * 255);
}

function getRandomColor() {
    let red = getRandomHex();
    let green = getRandomHex();
    let blue = getRandomHex();
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function playReady() {
    ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxIntro.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    newGame()
    setInterval(function (){

            for (let i = 0; i < obstacles.length; i++) {
                game.obstacles[i].shoot();
            }

    },2000)
    // countDown(1);
}

// function countDown(time) {
//     if (time > 0) {
//         introGame(time);
//         setTimeout(function () {
//             countDown(time - 1)
//         }, 1000);
//     } else {
//         cvGame.style.webkitFilter = "blur(0px)";
//         ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
//         ctxIntro.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
//         ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
//         newGame()
//     }
// }

function playReset() {
    cvGame.style.webkitFilter = "blur(0px)";
    ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxIntro.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    game = new Game();
    obstacles = [];
    scores = 0;
}

function newGame() {
    //new Game
    game = new Game();
    game.ready = true;
    //Display player
    game.player.show();
    // Initialize array obstacles
    obstacles = [];
    // Creat multiple obstacles
    game.createMultipleObstacles();
    // draw obstacles
    game.drawMultipleObstacles();
    // reset score
    scores = 0;
    musicBackground = new Sound('./sounds/background4.m4a');
    musicBackground.play();
    // replay sound
    setInterval(function () {
        // stop before replay
        musicBackground.stop();
        musicBackground = new Sound('./sounds/background4.m4a');
        musicBackground.play();
    }, 132000); // this is the play time of sound
    game.start();
}


function outroGame() {
    cvGame.style.webkitFilter = "blur(2px)";
    ctxIntro.textAlign = "center";
    ctxIntro.font = "bold 80px Impact ";
    ctxIntro.fillStyle = 'yellow';
    ctxIntro.fillText("Game Over", CV_WIDTH / 2, CV_HEIGHT / 2);
    //ghi lại điểm số
    if (highScore > scores) {
        ctxIntro.font = "bold 25px Impact ";
        ctxIntro.fillStyle = 'yellow';
        ctxIntro.fillText("New high score: " + highScore, CV_WIDTH / 2, CV_HEIGHT / 1.7);
    } else {
        ctxIntro.font = "bold 25px Impact ";
        ctxIntro.fillStyle = 'yellow';
        ctxIntro.fillText("High score: " + scores, CV_WIDTH / 2, CV_HEIGHT / 1.7);
    }

    ctxIntro.font = "20px Impact";
    ctxIntro.fillStyle = 'red';
    ctxIntro.fillText('Press Enter to continute...', CV_WIDTH / 2, CV_HEIGHT / 1.4);
}


