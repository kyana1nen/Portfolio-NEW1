var Level2 = {
    style: null,
    text: null,
    left: null,
    right: null,
    up: null,
    iceplat: null,
    sprite: null,
    iceplats: null,
    tree: null,
    tree2: null,
    myGroup: null,
    life: 3,
    //masX: [70, 370, 670, 970, 1270, 1570, 1870, 2170, 2470, 2770, 3070, 3370, 3670, 3970],
    massX: [0, 200, 700, 1300, 1700, 2100, 2500, 2900, 3300, 3700],
    massY: [500, 500, 300, 300, 300, 300, 300, 300, 300, 300, 300],
    preload: function () {
        game.load.image('left', 'img/arrowLeft.png');
        game.load.image('right', 'img/arrowRight.png');
        game.load.image("up", "img/arrowUp.png");
        game.load.spritesheet('sprite', 'img/sprite.png', 100, 100);
        game.load.image("iceplat", "img/iceplat.png");
        game.load.image('tree', 'img/tree.png');
        game.load.image('tree2', 'img/tree1.png');
    },
    create: function () {
        this.myGroup = game.add.group()
        var style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        text = game.add.text(50, 50, "", style);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#00d8ff";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.sprite = game.add.sprite(200, game.world.height - 200, 'sprite');
        game.physics.arcade.enable(this.sprite);

        this.sprite.animations.add('left', [0, 1, 2], 10, true);
        this.sprite.animations.add('right', [4, 5, 6], 10, true);
        this.sprite.body.collideWorldBounds = true;

        game.add.text(25, 25, 'Life: ' + this.life);

        this.iceplats = game.add.group();
        this.iceplats.enableBody = true;

        this.tree = game.add.group();
        this.tree2 = game.add.group();

        //this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 300;

        /*for (i = 0; i < this.masX.length; i++) {
            var b = this.tree.create(this.masX[i], 320, "tree");
        };
        for (i = 0; i < this.masX.length; i++) {
            var c = this.tree2.create(this.masX[i] - 90, 530, "tree2");
        };*/
        for (i = 0; i < 10; i++) {
            var a = this.iceplats.create(this.massX[i], 500, 'iceplat');
            a.body.immovable = true;
        }
        this.left = game.add.sprite(25, 500, "left");
        this.right = game.add.sprite(125, 500, "right");
        this.up = game.add.sprite(700, 500, "up");
        this.left.click = "left";
        this.right.click = "right";
        this.up.click = "up";
        game.world.setBounds(0, 0, 4200, 600);
        game.camera.follow(this.sprite);
        this.up.fixedToCamera = true;
        this.left.fixedToCamera = true;
        this.right.fixedToCamera = true;

        this.right.inputEnabled = true;
        this.left.inputEnabled = true;
        this.up.inputEnabled = true;

        this.up.events.onInputDown.add(this.func, this);
        this.left.events.onInputDown.add(this.func, this);
        this.right.events.onInputDown.add(this.func, this);

        this.up.events.onInputUp.add(this.upFunc, this);
        this.left.events.onInputUp.add(this.upFunc, this);
        this.right.events.onInputUp.add(this.upFunc, this);
        this.myGroup.enableBody = true;
        this.myGroup.immovable = true;
    },
    upFunc: function () {
        Level1.sprite.body.velocity.x = 0;
        Level1.sprite.body.velocity.y = 0;
        Level1.sprite.animations.stop();
        Level1.sprite.frame = 4;
    },
    func: function (a) {
        if (a.click == "up") {
            Level1.sprite.body.velocity.y = -300;
        }
        if (a.click == "left") {
            Level1.sprite.body.velocity.x = -300;
            Level1.sprite.animations.play('left');

        } else if (a.click == "right") {
            Level1.sprite.body.velocity.x = 300;
            Level1.sprite.animations.play('right');
        }
    },
    update: function () {
        game.physics.arcade.collide(this.sprite, this.iceplats);
        game.physics.arcade.collide(this.sprite, this.myGroup, Level1.check);
        if (this.sprite.y == 700) {
            alert("Нельзя падать вниз!");
            this.life = this.life--;
        }
    }
}

/*check: function (arg1,arg2) {
        console.log(arg1,arg2);
        if(arg2._text=="Матс Валк"){
            Level1.myGroup.remove(arg2);
            alert("ПРАВИЛЬНООООО!");
            game.state.start("lev2");
        } else {
            alert("Неправильно");
        }
    }
}*/
