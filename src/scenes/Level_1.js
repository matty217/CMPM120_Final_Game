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

        this.load.spritesheet('cat', 'assets/cat_walk_sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });

    }

    create() {
         // camera and world bounds
        // (change static values to a variable later)
        this.cameras.main.setBounds(0, 0, 2000 , 720);
        this.physics.world.setBounds(0, 0,2000, 720);

        this.cameras.main.setBackgroundColor('#333333');

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        //this.background = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0x444444).setOrigin(0.5,0.5);

            // set up player character
        this.player = new Cat(this, 270, 500, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.2);
        //this.player.body.setMaxVelocity(600, 5000);

        this.cat_example = this.add.sprite(800, 150, 'cat', 0).setOrigin(0.5,0.5).setScale(0.5);


        this.ground = this.add.sprite(game.config.width/2, game.config.height-100, 'rect', 0).setOrigin(0.5,0).setScale(10);
        this.wall1 = this.add.sprite(game.config.width+900, game.config.height/2, 'rect', 0).setOrigin(0, 0.5).setScale(10);
        this.wall2 = this.add.sprite(-500, game.config.height/10, 'rect', 0).setOrigin(0, 0).setScale(1);

        this.plat_0001 = this.add.sprite(820, 286, 'platform', 0);
        this.plat_0003 = this.add.sprite(1320, 420, 'platform_vert', 0).setScale(2);
        this.plat_0004 = this.add.sprite(950, 220, 'platform_vert', 0);
        this.plat_0005 = this.add.sprite(950, 20, 'platform_vert', 0);
        this.plat_0006 = this.add.sprite(500, 630, 'platform_vert', 0);
    

        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.player, this.platformGroup);

        this.platformGroup.add(this.ground);
        this.platformGroup.add(this.wall1);
        this.platformGroup.add(this.wall2);
        this.platformGroup.add(this.plat_0001);
        this.platformGroup.add(this.plat_0003);
        this.platformGroup.add(this.plat_0004);
        this.platformGroup.add(this.plat_0005);
        this.platformGroup.add(this.plat_0006);

        // use checkpoint to go to next level
        this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
        this.checkpoint1 = this.add.sprite(1800, game.config.height - 200, 'rect', 0).setOrigin(0,0.5);
        this.checkpoint.add(this.checkpoint1);
        this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel2, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher); 
        
         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        var style = { font: "20px Arial", fill: "#ffffff" };
        this.add.text(450,400,'SPACE to jump', style)
        this.add.text(200,430,'WASD to move', style)
        this.add.text(1200,30,'Try jumping while sliding\nagainst the wall', style)
        this.add.text(0,0,'W while sliding against\nthe wall to climb', style)

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
    }

    update() {
        this.player.update();
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