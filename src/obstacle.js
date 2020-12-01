const EASY_SPEED = 0.45;
const MEDIUM_SPEED = 0.6;
const HARD_SPEED = 1;
const INCREASE_SPEED = 2;
const NUMBERS_OBSTACLES = 10;
const OBSTACLES_SIZE = 70;
const OBSTACLES_RATIO = 0.4;
const BLUR_LEVEL = 30;
const BLUR_COLOR = 'aqua';

// ******** Initialize class obstacles *************
let Obstacles = function (){
    let self = this;
    this.x = Math.floor(Math.random()*(CV_WIDTH - OBSTACLES_SIZE * 2) + OBSTACLES_SIZE );
    this.y = Math.floor(Math.random()* (-CV_HEIGHT));
    this.img = new Image();
    this.setType = function (link, size, speed){
        this.img.src = link;
        this.width = size;
        this.height = size;
        type = Number(link[link.length-5]);
        switch (type) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                self.hp = 1;
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                self.hp = 2;
                break;
        }
        this.speed = speed;
    }
    this.draw = function (){
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxGame.shadowColor = getRandomColor();
        ctxGame.shadowBlur = BLUR_LEVEL;
        ctxGame.drawImage(self.img, x, y, width, height);
    }
    this.move = function (){
        this.y += this.speed;
    }

    this.shoot = function (){
        if (this.y + this.height >= 0){ // when the obstacle appear
            let bullet = new Bullet_Type();
            bullet.setType('bulletOfObstacle','./images/bullet5.png',30,4,1); // name, link, size, speed, dame
            this.bullet.x = this.x + this.width/2 - this.bullet.width/2; // set appear position of obstacle's bullet same position of obstacle
            this.bullet.y = this.y + this.height - this.bullet.height; // set obstacle's bullet appear from center of obstacle
            this.bullet.move();
        };

    }

    // set method explosion for obstacle
    this.explosive = new Explosion();
    this.isDestroyed =function (index){
        if (obstacles[index].hp == 0){
            // set position for explosion same position of obstacle.
            let posX = obstacles[index].x + obstacles[index].width / 2 - obstacles[index].explosive.size/2;
            let posY = obstacles[index].y + obstacles[index].height /2 - obstacles[index].explosive.size/2;
            self.explosive.setPosition(posX,posY);
            soundExplosive.play(); // sound
            obstacles[index].start();
            // delete item and create a new item
            let remoteItem = obstacles.splice(index,1);
            let obstacle = new Obstacles();
            let link = './images/ufo' + Math.floor(Math.random() * NUMBERS_UFO_IMAGES) + '.png'
            obstacle.setType(link, OBSTACLES_SIZE, EASY_SPEED)
            obstacles.push(obstacle);
            //each of obstacle was destroyed, score + 1
            scores++;
        }
    }
}
