// Create constants to save default values
const ORIENTATION_UP = 'up';
const ORIENTATION_DOWN = 'down';
const ORIENTATION_LEFT = 'left';
const ORIENTATION_RIGHT = 'right';
const DEFAULT_ORIENTATION = ORIENTATION_UP;
const PLAYER_RATIO = 0.25;
const CV_WIDTH = myCanvas.width;
const CV_HEIGHT = myCanvas.height;
const DEFAULT_POSISION_Y = CV_HEIGHT - 100;
const DEFAULT_POSISION_X = CV_WIDTH / 2;
const DEFAULT_SPEED = 5;
const PLAYER_HP = 10;
const CTRL_KEY = 17;
const SPACE_KEY = 32;
const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;
const ENTER_KEY = 13;
const PLAYER_BULLET_SPEED = -BULLET_SPEED;

//********* Define class Player ***************
let Player = function () {
// set self = this. to avoid miss understanding class Player and 'this' of methods in class Player.
    let self = this;
    this.x = DEFAULT_POSISION_X;
    this.y = DEFAULT_POSISION_Y;
    this.hp = PLAYER_HP;
    this.image = new Image();
    this.image.src = './images/combat_Aircrafts.png';
    this.width = this.image.naturalWidth * PLAYER_RATIO;
    this.height = this.image.naturalHeight * PLAYER_RATIO;
    this.speed = DEFAULT_SPEED;
    this.orientation = DEFAULT_ORIENTATION;
    // Draw my Fighter
    this.show = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxGame.lineTo(x+15,y+15);
        ctxGame.lineTo(x-15,y+15);
        ctxGame.drawImage(self.image, x, y, width, height);
    };
//*********************************************

//************* Event keyboard move left right and ctrl to shoot *****************
    this.changeOrientation = function (event) {
        // when game over disable keyboard unless key enter
        if (game.ready) {
            switch (event.keyCode) {
                case LEFT_ARROW_KEY:
                    this.orientation = ORIENTATION_LEFT;
                    break;
                case RIGHT_ARROW_KEY:
                    this.orientation = ORIENTATION_RIGHT;
                    break;
                case CTRL_KEY:
                    this.shoot();
                    // for (let i = 0; i < obstacles.length; i++) {
                    //     game.obstacles[i].shoot();
                    // }
                    break;
            }
        }
    };
//**********************************************

//************ change the property left of fighter to move with one step by speed *****************
    this.changeOrientationUp = function (e){
        if (e.keyCode == LEFT_ARROW_KEY) this.orientation = 0;
        if (e.keyCode == RIGHT_ARROW_KEY) this.orientation = 0;
    }
    this.move = function () {
        console.log(this.orientation);
        switch (this.orientation) {
            case ORIENTATION_LEFT:
                if (this.x <= 0 - this.width/2) { //when my fighter move to left, right edge. keep that position
                    this.x = 0 - this.width/2;    // and hide half to fire out bullet sát cạnh
                }
                this.x -= this.speed;
                break;
            case ORIENTATION_RIGHT:
                if (this.x >= CV_WIDTH - this.width/2) {
                    this.x = CV_WIDTH - this.width/2;
                }
                this.x += this.speed;
                break;
        }
    };
//**********************************************

//************ set event shoot *************
    this.shoot = function () {
        let name = 'bulletOfPlayer';
        let link = "./images/rocket2.png";
        let size = 30;
        let speed = PLAYER_BULLET_SPEED; // negative because the bullet move up, so position = top - speed
        let damage = 1;
        let bullet = new Bullet();
        bullet.setType(name, link, size, speed, damage);
        this.bullet = bullet;
        //set position of bullet same position of my Fighter
        this.bullet.x = this.x + this.width / 2 - this.bullet.width / 2;
        this.bullet.y = this.y;
        soundShoot.play();
        // soundShoot.stop();
        this.bullet.move();
    }
// set method explosive ????
    this.explosive = new Explosion();
};
