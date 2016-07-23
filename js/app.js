var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y; 
    this.speed = speed;
    this.collisionWidth = 30;
    this.collisionHeight = 30;
};

// A very special enemy subclass
var Trump = function(x, y, speed){
    this.sprite = 'images/trump-bug.png';
    this.x = x;
    this.y = y; 
    this.speed = speed;
    this.collisionWidth = 30;
    this.collisionHeight = 30;
};

Trump.prototype = new Enemy();
Trump.prototype.constructor = Trump;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks <-- this gives me strange results so it's been omitted
Enemy.prototype.update = function(dt, player) {
        if(this.x >= 500) {
            this.x = this.x - 500;
        } else if(this.x <= 500){
            this.x = this.x + this.speed;
            this.checkCollision(player);
        }     
};

// Checks for collision with the player
Enemy.prototype.checkCollision = function(player) {
    if (Math.abs(player.x - this.x) < this.collisionWidth && Math.abs(player.y - this.y) < this.collisionHeight) {
         player.reset();
        }
};


// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };


// This is the player class, includes a prompt for character selection
var Player = function(x, y) {
        this.sprite = function() {
            var charSelect = prompt("Welcome to Dodge the Roach! Would you like to be a boy or girl?");
            if(charSelect.toUpperCase() === "girl".toUpperCase()) {
                charSelect = prompt("Are you a princess?");
                if(charSelect.toUpperCase() === "yes".toUpperCase()) {
                    this.sprite = 'images/char-princess-girl.png';
                } else {
                this.sprite = 'images/char-pink-girl.png';
                }
            } else if(charSelect.toUpperCase() === "boy".toUpperCase()){
                this.sprite = 'images/char-boy.png';
            }
        };
        this.x = x;
        this.y = y;
        this.speed = 20;
        this.reset = function() {
            this.x = 200;
            this.y = 400;
        };
    };

Player.prototype.update = function(dt) {
}; 


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This handles player movement
Player.prototype.handleInput = function(keyCode){
    if(keyCode === 'up' && this.y >= 10) {
        this.y = this.y - this.speed;
            if(this.y === 0) {
            alert("You've won the game!");
            player.reset();
        }
    } else if(keyCode === 'down' && this.y <= 400) {
        this.y = this.y + this.speed;
    } else if(keyCode === 'left' && this.x >= 0) {
        this.x = this.x - this.speed;
    } else if(keyCode === 'right' && this.x <= 400) {
        this.x = this.x + this.speed;
    }
};

   
var player = new Player(200,400);
player.sprite();

var enemy1 = new Enemy(25, 75, 5);
var enemy2 = new Trump(75, 150, 3);
var enemy3 = new Enemy(0, 225, 10);

var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
