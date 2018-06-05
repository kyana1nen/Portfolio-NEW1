var Level1 = {
    ship: null,
    ship2: null,
    bulletTime: null,
    bullet: null,
    bullets: null,

    preload: function () {
        game.load.image('space', 'img/fon.png');
        game.load.image('bullet', 'img/laserPurple.png');
        game.load.image('ship', 'img/samoletik.png');
        game.load.image('ship2', 'img/vrajsamoletik.png');
        game.load.image('left', 'img/arrowLeft.png');
        game.load.image('right', 'img/arrowRight.png');
        game.load.image("up", "img/arrowUp.png");
        game.load.image("shoot", 'img/shoot.jpg');
    },

    create: function () {
        game.renderer.clearBeforeRender = false;
        game.renderer.roundPixels = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, game.width, game.height, 'space');

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets.createMultiple(40, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);

        this.shoot = game.add.sprite(700, 600, 'shoot');

        this.sprite = game.add.sprite(300, 300, 'ship');
        this.sprite.anchor.set(0.5);
        this.sprite.scale.setTo(0.05, 0.05)

        this.sprite2 = game.add.sprite(400, 400, 'ship2');
        this.sprite2.anchor.set(0.5);
        this.sprite2.scale.setTo(0.03, 0.03)

        game.physics.arcade.enable([this.sprite, this.sprite2]);

        this.left1 = game.add.sprite(25, 500, "left");
        this.right1 = game.add.sprite(157, 500, "right");
        this.up1 = game.add.sprite(92, 450, "up");
        this.shoot.click = "shoot";
        this.left1.click = "left1";
        this.right1.click = "right1";
        this.up1.click = "up1";
        this.shoot.inputEnabled = true;
        this.right1.inputEnabled = true;
        this.left1.inputEnabled = true;
        this.up1.inputEnabled = true;
        this.shoot.events.onInputDown.add(this.func, this);
        this.up1.events.onInputDown.add(this.func, this);
        this.left1.events.onInputDown.add(this.func, this);
        this.right1.events.onInputDown.add(this.func, this);
        this.sprite.body.drag.set(100);
        this.sprite.body.maxVelocity.set(200);

        this.sprite2.body.drag.set(100);
        this.sprite2.body.maxVelocity.set(200);

        this.cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    },

    func: function (a) {
        if (a.click == "up1") {
            game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 200, this.sprite.body.acceleration);
            console.log("!");
        } else {
            this.sprite.body.acceleration.set(0);
        }
        if (a.click == "left1") {
            this.sprite.body.angularVelocity = -300;
            console.log("!");
        } else {
            this.sprite.body.angularVelocity = 0;
        }
        if (a.click == "right1") {
            this.sprite.body.angularVelocity = 300;
            console.log("!");
        } else {
            this.sprite.body.angularVelocity = 0;
        }
        if (a.click == "shoot") {
            this.fireBullet();
            console.log("!");
        }
    },


    update: function () {

        if (this.cursors.up.isDown) {
            game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 200, this.sprite.body.acceleration);
        } else {
            this.sprite.body.acceleration.set(0);
        }

        if (this.cursors.left.isDown) {
            this.sprite.body.angularVelocity = -300;
        } else if (this.cursors.right.isDown) {
            this.sprite.body.angularVelocity = 300;
        } else {
            this.sprite.body.angularVelocity = 0;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fireBullet();
        }

        Level1.screenWrap(this.sprite);

        this.bullets.forEachExists(Level1.screenWrap, this);

    },

    fireBullet: function () {

        if (game.time.now > this.bulletTime) {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {
                this.bullet.reset(this.sprite.body.x + 16, this.sprite.body.y + 16);
                this.bullet.lifespan = 2000;
                this.bullet.rotation = this.sprite.rotation;
                game.physics.arcade.velocityFromRotation(this.sprite.rotation, 400, this.bullet.body.velocity);
                this.bulletTime = game.time.now + 50;
            }
        }

    },

    screenWrap: function (sprite) {

        if (sprite.x < 0) {
            sprite.x = game.width;
        } else if (sprite.x > game.width) {
            sprite.x = 0;
        }

        if (sprite.y < 0) {
            sprite.y = game.height;
        } else if (sprite.y > game.height) {
            sprite.y = 0;
        }
    }
}
