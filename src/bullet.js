const BULLET_SIZE = 30;
const BULLET_SPEED = 8;
const BULLET_RATIO = 0.08;

// *********** Initialize type of bullets **********
let Bullet_Type = function (name, link, size, speed, dame) {
    this.name = name;
    this.link = link;
    this.size = size;
    this.speed = speed;
    this.dame = dame;
}
//**********************************************************

//*********** Initialize class Bullet *****************
let Bullet =function () {
    let seft = this;
    this.x;
    this.y;
    this.img = new Image();
    this.setType = function (name, link, size, speed, dame){
        this.type =new Bullet_Type(name, link, size, speed, dame);
        this.img.src = this.type.link;
        if (this.type.speed <=0){ // the speed of Player move up, so the value is negative
            this.width = this.type.size / 3; // the width of player's bullet smaller than the standard size.
            this.height = this.type.size;  // keep the height to have a bullet that have width smaller than height.
        } else {
            this.width = this.type.size / 4; // the width of obstacle's bullet smaller than the bullet of player.
            this. height = this.type.size; // keep the height to have a bullet that have width smaller than height.
        }

    }

    //********* Draw bullets **********8
    this.draw = function (){
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxBullet.drawImage(self.img, x, y, width, height);
    }

    //******** set destroy when bullets collide fighters
    this.destroy =function () {
        if (this.name == 'bulletOfPlayer'){ // this is bullet of Player. different bullet of obstacles
            if (this.y<=0) return true; // y <= 0 is when the bullet move to top of canvas without collide anything
            // case bullet collide any obstacles
            for (let i = 0; i < abstacles.length; i++) {
                //  right edge of bullet touch left edge of obstacle and left edge of bullet touch right edge of obstacle and the top of bullet touch bottom edge of obstacle
                if (this.x + this.width >= obstacles[i].x && this.x <= obstacles[i].x + obstacles[i].width && this.y <= obstacles[i].y + obstacles[i].height){
                    obstacles[i].hp--; // reduce the hp of obstacles
                    obstacles[i].isDestroyed(i); //destroy the Obstacle
                    return true;
                }
            }
        } else { // this is bullet of obstacle.
            if (this.y + this.height >= CV_HEIGHT) return true; // bottom of bullet touch bottom edge of canvas frame
            else if (this.x + this.width >= game.player.x + game.player.width * PLAYER_RATIO &&
                this.x <= game.player.x + game.player.width * 0.75 &&
                this.y + this.height >= game.player.y + game.player.height * PLAYER_RATIO) {
                    if (game.player.hp > 0) game.player.hp --;
                    else game.over = true;
            }
            return true;
        }


    }
    this.move = function () {
        if (self.destroy()) {
            ctxBullet.clearRect(self.x, self.y, self.width, self.height)
            return;
        }
        callBackBulletMove = requestAnimationFrame(self.move)
        ctxBullet.clearRect(self.x, self.y, self.width, self.height)
        self.y += self.type.speed;
        self.draw();
    }
}
