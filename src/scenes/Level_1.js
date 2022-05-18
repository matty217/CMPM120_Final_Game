class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }
    PlayerController

    preload() {
        this.load.image('rect', './assets/white-square.png');
        this.load.image('platform', './assets/platform.png');
        this.load.image('platform_vert', './assets/platform_vert.png');
        this.load.image('spikes', './assets/spikes.png');
        this.load.image('boulder', './assets/Levels/Blocks/1x1 Boulder.PNG');
        this.load.image('block_1', './assets/Levels/Blocks/1x1 Block.PNG');
        this.load.image('plat_1', './assets/Levels/Blocks/Platform Large.PNG');
        this.load.image('plat_2', './assets/Levels/Blocks/Platform Small.PNG');
        this.load.image('spikes_1', './assets/Levels/Blocks/1x1 Spikes.PNG');
        this.load.image('back_1', './assets/Levels/Level-1/Background-1.PNG');
        this.load.image('back_2', './assets/Levels/Level-1/Midground-1.PNG');
        this.load.image('back_3', './assets/Levels/Level-1/Foreground-1.PNG');

        this.load.spritesheet('cat', 'assets/cat_walk_sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.audio('meow', 'assets/meow.wav');

    }

    create() {
         // camera and world bounds
        // (change static values to a variable later)
        this.cameras.main.setBounds(0, -4000, 20000 , 5000);
        //this.physics.world.setBounds(0, 0, 20000, 10000);
        //this.physics.world.removeBounds(0, 0, 20000, 10000);

        this.cameras.main.setBackgroundColor('#333333');

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // BACKGROUND STUFF
        //this.background = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0x444444).setOrigin(0.5,0.5);
        this.back_0001 = this.add.sprite(-100, 400, 'back_1', 0).setScale(0.8).setOrigin(0.3,1);
        this.back_0002 = this.add.sprite(-100, 400, 'back_2', 0).setScale(0.8).setOrigin(0.2,1);
        this.back_0003 = this.add.sprite(-100, 400, 'back_3', 0).setScale(0.8).setOrigin(0.2,1);

            // set up player character
        this.player = new Cat(this, 100, -400, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.15);
        //this.player.body.setMaxVelocity(600, 5000);

        this.cat_example = this.add.sprite(800, 150, 'cat', 0).setOrigin(0.5,0.5).setScale(0.5);


        this.ground = this.add.sprite(game.config.width/2, game.config.height-100, 'rect', 0).setOrigin(0.5,0).setScale(10);
        // this.wall1 = this.add.sprite(game.config.width+900, game.config.height/2, 'rect', 0).setOrigin(0, 0.5).setScale(10);
        // this.wall2 = this.add.sprite(-500, game.config.height/10, 'rect', 0).setOrigin(0, 0).setScale(1);

        this.platg_0000 = this.add.sprite(0, 0, 'platform', 0).setScale(13).setOrigin(0,0);
        this.platg_0001 = this.add.sprite(2900, 0, 'platform', 0).setScale(6).setOrigin(0,0);
        this.platg_0002 = this.add.sprite(4000, 100, 'platform', 0).setScale(6).setOrigin(0,0);

        this.plat_0001 = this.add.sprite(820, 286, 'platform', 0);
        this.plat_0002 = this.add.sprite(3600, -10, 'plat_2', 0).setScale(0.2);
        this.plat_0003 = this.add.sprite(4500, -200, 'platform', 0);

        this.sp_0003 = this.add.sprite(3558, -140, 'spikes_1', 0).setScale(0.2);
        this.sp_0004 = this.add.sprite(3635, -140, 'spikes_1', 0).setScale(0.2);


        this.rock1 = this.add.sprite(1100, 80, 'block_1', 0).setScale(0.6);
        this.rock2 = this.add.sprite(2000, -20, 'block_1', 0).setScale(0.5);

    

        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.player, this.platformGroup);

        this.platformGroup.add(this.ground);
        // this.platformGroup.add(this.wall1);
        // this.platformGroup.add(this.wall2);
        this.platformGroup.add(this.platg_0000);
        this.platformGroup.add(this.platg_0001);
        this.platformGroup.add(this.platg_0002);

        this.platformGroup.add(this.plat_0001);
        this.platformGroup.add(this.plat_0002);
        this.platformGroup.add(this.plat_0003);

        this.platformGroup.add(this.rock1);
        this.platformGroup.add(this.rock2);
       

        // use checkpoint to go to next level
        this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
        this.checkpoint1 = this.add.sprite(1800, game.config.height - 200, 'rect', 0).setOrigin(0,0.5);
        this.checkpoint.add(this.checkpoint1);
        this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel2, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher); 

         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);

        var style = { font: "20px Arial", fill: "#ffffff" };
        this.add.text(0,-400,'SPACE to jump', style)

        //ANIMATIONS
        const catWalk = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('cat', {
                start: 0,
                end: 11
            }),
            frameRate: 18,
            repeat: -1
        });

        this.cat_example.play({ key: 'walk' });

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        this.player.update();
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('meow');
        }

        // BACKGROUND
        this.back_0001.x = this.player.x/1.3;
        this.back_0002.x = this.player.x/3;
        this.back_0003.x = this.player.x/4;

        console.log(this.cameras.main.x);


    }

    goToLevel2(player, checkpoint) {
        game.scene.start('level2Scene');
        game.scene.bringToTop('level2Scene');
        game.scene.pause('level1Scene');
        game.scene.pause('level3Scene');
        game.scene.pause('level4Scene');
        game.scene.pause('level5Scene');
    }

}