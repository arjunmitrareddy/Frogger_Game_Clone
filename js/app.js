//Todo: Too Many Globals, FIXME
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
Enemy.prototype.update = function(dt) {
    if (this.x >= player.x && this.x <= player.x + 101) {
        if (this.y == player.y) {
            player.reset();
            score--;
            processUI(score);
        }
    }
    this.x += ((this.x + (101 * this.speed)) * dt);
    if (this.x >= 505 ) {
        this.reset();
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.reset = function() {
    this.x = 0;
};
var Player = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};
Player.prototype.update = function() {

};
Player.prototype.reset = function() {
    this.x = initPos.x;
    this.y = initPos.y;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(dir) {
    if (dir == "left") {
        if (this.x != 0)
            this.x -= 101
    }
    else if (dir == "right") {
        if (this.x <= 505 - initPos.x)
            this.x += 101
    }
    else if (dir == "up") {
        if (this.y > 101 ) {
            this.y -= 83;
        }
        else {
            this.y = 83*5;
            score++;
            processUI(score);
        }
    }
    else if (dir == "down") {
        if (this.y < 415)
            this.y += 83
    }
    else {
        var canvas_x = event.targetTouches[0].pageX;

    }
};
var initPos = {x : 202, y: 415};
var allEnemies = [];
var player = new Player(initPos.x, initPos.y, 'images/char-boy.png');
function init(sprite) {
    var e1 = new Enemy(0, 83, window.speeds[0]);
    var e2 = new Enemy(0, 83*2, window.speeds[1]);
    var e3 = new Enemy(101, 83*3, window.speeds[2]);
    var e4 = new Enemy(101, 83*4, window.speeds[3]);
    allEnemies = [e1,e2,e3,e4];
    player.sprite = sprite;
    div.style.visibility = "visible";
    window.canvas.style.visibility = "visible";
    message.style.visibility = "visible";
    hi.style.visibility = "visible";
    begin.style.visibility = "hidden";
}
function registerServiceWorker() {
    if (!navigator.serviceWorker) {
        return;
    }
    navigator.serviceWorker.register('serviceWorker.js').then((registrationObject) => {
        if (!navigator.serviceWorker.controller) {
            return;
        }
        if (registrationObject.waiting) { //means service worker is ready to be updated
            worker.postMessage({skipWait: true});
        }
        if (registrationObject.installing) {
            trackInstall(registrationObject.installing);
            return;
        }
        registrationObject.addEventListener('updatefound', () => {
            trackInstall(registrationObject.installing);
        });
        navigator.serviceWorker.controller.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    });
}
registerServiceWorker();
function trackInstall(worker) {
    worker.addEventListener('statechange', () => {
        if (worker.state == 'installed') {
            worker.postMessage({skipWait: true});
        }
    })
}
