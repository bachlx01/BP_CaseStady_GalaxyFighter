const NUMBERS_UFO_IMAGES = 10;

//Initialize class Game
let Game = function () {
    let self = this;
    this.over = false;
    this.ready;
    this.player = new Player();
    this.bullet = new Bullet();
    // Creat multiple Obstacles when begin. then each of obstacle is deleted, creat more one to replace
    this.createMultipleObstacles = function () {
        for (let i = 0; i < NUMBERS_OBSTACLES; i++) {
            this.obstacle = new Obstacles();
            let link = './images/ufo' + Math.floor(Math.random() * NUMBERS_UFO_IMAGES) + '.png';
            this.obstacle.setType(link, OBSTACLES_SIZE, EASY_SPEED)
            obstacles.push(this.obstacle);
        }

        this.obstacles = obstacles;
    };
    // Draw created obstacles
    this.drawMultipleObstacles = function () {
        for (let i = 0; i < self.obstacles.length; i++) {
            self.obstacles[i].draw();
        }
    }
    //Call method continuously until game over
    this.start = function () {
        if (self.over) {
            soundPlayerExplosive.play();
            // make a explosion effect at center screen
            let posX = self.player.x + self.player.width / 2 - self.player.explosive.size / 2;
            let posY = self.player.y + self.player.height / 2 - self.player.explosive.size / 2;
            self.player.explosive.setPosition(posX, posY);
            //
            ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);  // clear screen
            // self.drawMultipleObstacles();
            self.player.explosive.start();  // draw the explosion of player
            musicBackground.stop();
            soundGameOver.play();
            window.clearInterval(callBackMusicBackground);
            cancelAnimationFrame(callBackBulletMove);
            outroGame();
            self.ready = false;
            // highScore = checkCookie();
            return; // If game over then out game
        }
        requestAnimationFrame(self.start); // this statement executive function 'start' continuously
        ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT); // clear screen before to add items in new position
        ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT); // clear bullet
        self.player.move(); // move player
        self.player.show();  // show at new position
        //draw and move obstacles
        for (let i = 0; i < self.obstacles.length; i++) {
            self.obstacles[i].move();
            if (self.obstacles[i].y >= CV_HEIGHT) {
                self.obstacles[i].x = Math.floor(Math.random() * (CV_WIDTH - 150) + 100);
                self.obstacles[i].y = Math.floor(Math.random() * (-CV_HEIGHT));
            }
            self.obstacles[i].draw();  // draw at new position
        }
        //record and show status and score at left corner of screen
        self.record()
        //check status game
        self.end();
    };
    this.end = function () {  // when any obstacle collide player or bottom edge, this.over = true and end game
        for (let i = 0; i < self.obstacles.length; i++) {
            let playerCollideObstacle = this.player.x + this.player.width / 2 >= this.obstacles[i].x &&
                this.player.x + this.player.width / 2 <= this.obstacles[i].x + this.obstacles[i].width &&
                this.player.y + this.player.height / 2 <= this.obstacles[i].y + this.obstacles[i].height;
            let obstacleCollideBottomEdge = this.obstacles[i].y + this.obstacles[i].height >= CV_HEIGHT;
            if (playerCollideObstacle || obstacleCollideBottomEdge) {
                this.over = true;
            }
        }
    }
    //
    this.record = function () {
        ctxGame.textAlign = "center";
        ctxGame.font = "30px Impact";
        ctxGame.fillStyle = 'white';
        ctxGame.fillText('SCORES: ' + scores, 170, 30);
        ctxGame.font = "30px Impact";
        ctxGame.fillStyle = 'red';
        ctxGame.fillText('HP: ' + self.player.hp, 50, 30);
    }
};

// Creat a element audio.
let Sound = function (src) {
    let self = this;
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        self.sound.play();
    }
    this.stop = function () {
        self.sound.pause();
    }
}
