class Level2 extends Phaser.Scene {
    constructor() {
        super("level2Scene");
    }

    preload() {
        // temp assets
        this.load.image('rect', './assets/white-square.png');
        this.load.image('platform_vert', './assets/platform_vert.png');
        this.load.image('red', './assets/red.png'); 
        this.load.spritesheet('boom', 'assets/temp_geyser.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });

    }

    create() {
        // camera and world bounds
        // (change static values to a variable later)
        this.cameras.main.setBounds(0, 0, 2000 , 720);
        this.physics.world.setBounds(0, 0,2000, 720);

        this.ACCELERATION = 500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        // this.physics.world.gravity.y = 3000;

        this.cameras.main.setBackgroundColor('#0000ff');

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        //this.background = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0x444444).setOrigin(0.5,0.5);

        this.player = new Cat(this, game.config.width/2, game.config.height/2, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.2);

        this.ground = this.add.sprite(game.config.width/2, game.config.height-100, 'rect', 0).setOrigin(0.5,0).setScale(10);
        this.wall1 = this.add.sprite(game.config.width+900, game.config.height/2, 'rect', 0).setOrigin(0, 0.5).setScale(10);
        this.wall2 = this.add.sprite(-200, game.config.height/2, 'rect', 0).setOrigin(0, 0).setScale(0.5);

        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.player, this.platformGroup);

        this.platformGroup.add(this.ground);
        this.platformGroup.add(this.wall1);
        this.platformGroup.add(this.wall2);


        // GEYSERS
        
        // Geyser Group
        this.geyserGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.player, this.geyserGroup);

        // Geyser 1
        this.geyser1 = this.add.sprite(800, 500, 'platform_vert', 0).setOrigin(0, 0);
        let t = this.tweens.add({
            targets: this.geyser1,
            y: 400,
            duration: 3000,
            ease: 'Linear',
            yoyo: true,
            repeat: 2000
        });
        t.restart();
        this.geyserBase1 = this.add.sprite(800, 600, 'platform_vert', 0).setOrigin(0, 0);

        // Geyser 2
        this.geyser2 = this.add.sprite(1200, 500, 'platform_vert', 0).setOrigin(0, 0);
        let t2 = this.tweens.add({
            targets: this.geyser2,
            y: 400,
            duration: 2500,
            ease: 'Linear',
            yoyo: true,
            repeat: 2000
        });
        t2.restart();
        this.geyserBase2 = this.add.sprite(1200, 600, 'platform_vert', 0).setOrigin(0, 0);

        // Add Geysers to group
        this.geyserGroup.add(this.geyser1);
        this.geyserGroup.add(this.geyserBase1);
        this.geyserGroup.add(this.geyser2);
        this.geyserGroup.add(this.geyserBase2);
        
         // CHECKPOINT TO NEXT LEVEL
         this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
         this.checkpoint1 = this.add.sprite(1800, game.config.height - 200, 'rect', 0).setOrigin(0,0.5);
         this.checkpoint.add(this.checkpoint1);
         this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel3, null, this);
 

        this.input.keyboard.on('keydown', sceneSwitcher);  

        var style = { font: "20px Arial", fill: "#ffffff" };
        this.add.text(100,100,'level 2', style)

        // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update() {
        this.player.update();
    }

    goToLevel3(player, checkpoint) {
        game.scene.start('level3Scene');
        game.scene.bringToTop('level3Scene');
        game.scene.pause('level1Scene');
        game.scene.pause('level2Scene');
        game.scene.pause('level4Scene');
        game.scene.pause('level5Scene');
    }


}