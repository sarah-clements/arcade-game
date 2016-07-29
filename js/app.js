function Parent(x, y, speed) {
    "use strict";
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

function inheritPrototype(childObject, parentObject) {
    "use strict";
    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;
}

function Enemy(x, y, speed) {
    "use strict";
    Parent.call(this, x, y, speed);
    this.sprite = 'images/enemy-bug.png';
    this.collisionWidth = 30;
    this.collisionHeight = 30;
}

inheritPrototype(Enemy, Parent);

Enemy.prototype = {
    constructor: Enemy,
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks <-- this gives me strange results so it's been omitted
    update: function(dt, player) {
        "use strict";
        if (this.x >= 500) {
            this.x = this.x - 500;
        } else if (this.x <= 500) {
            this.x = this.x + this.speed;
            this.checkCollision(player);
        }
    },
    // Checks for collision with the player
    checkCollision: function(player) {
        "use strict";
        if (Math.abs(player.x - this.x) < this.collisionWidth && Math.abs(player.y - this.y) < this.collisionHeight) {
            player.reset();
        }
    },
};

function Player(x, y) {
    "use strict";
    Parent.call(this, x, y);
    // sprite has been moved
    this.tileHeight = 101;
    this.tileWidth = 83;
    this.reset = function() {
        this.x = 200;
        this.y = 400;
    };
}

inheritPrototype(Player, Parent);

Player.prototype = {
    constructor: Player,
    update:function(dt) {
        "use strict";
    },
    // This prompts the player to select a character, which is then assigned to sprite
    charSelect:function() {
        var character = prompt("Welcome to Dodge the Roach! Would you like to be a boy or girl?");
        if (character.toUpperCase() === "girl".toUpperCase()) {
            character = prompt("Are you a princess?");
            if (character.toUpperCase() === "yes".toUpperCase()) {
                this.sprite = 'images/char-princess-girl.png';
            } else {
                this.sprite = 'images/char-pink-girl.png';
            }
        } else if (character.toUpperCase() === "boy".toUpperCase()) {
            this.sprite = 'images/char-boy.png';
        }
    },
    // This handles player movement
    handleInput:function(keyCode) {
        "use strict";
        if (keyCode === 'up' && this.y > -105) {
            this.y = this.y - this.tileHeight;
            if (this.y === -105) {
                alert("You've won the game!");
                this.reset();
            }
        } else if (keyCode === 'down' && this.y < 400) {
            this.y = this.y + this.tileHeight;
        } else if (keyCode === 'left' && this.x > 0) {
            this.x = this.x - this.tileWidth;
        } else if (keyCode === 'right' && this.x < 400) {
            this.x = this.x + this.tileWidth;
        }
    } 
};

// This listens for key presses and sends the keys to the
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var player = new Player(200, 400);
player.charSelect();

var enemy1 = new Enemy(25, 75, 5);
var enemy2 = new Enemy(75, 150, 3);
var enemy3 = new Enemy(0, 225, 10);

var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);
