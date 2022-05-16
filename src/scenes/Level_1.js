class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }
    PlayerController

    preload() {
        this.load.image('rect', './assets/white-square.png');

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
        this.player = new Cat(this, game.config.width/2, game.config.height/2, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.2);
        //this.player.body.setMaxVelocity(600, 5000);

            // set up player controller


        this.ground = this.add.sprite(game.config.width/2, game.config.height-100, 'rect', 0).setOrigin(0.5,0).setScale(10);
        this.wall1 = this.add.sprite(game.config.width+900, game.config.height/2, 'rect', 0).setOrigin(0, 0.5).setScale(10);
        this.wall2 = this.add.sprite(-200, game.config.height/2, 'rect', 0).setOrigin(0, 0).setScale(0.5);

        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.player, this.platformGroup);

        this.platformGroup.add(this.ground);
        this.platformGroup.add(this.wall1);
        this.platformGroup.add(this.wall2);

        // use checkpoint to go to next level
        this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
        this.checkpoint1 = this.add.sprite(1800, game.config.height - 200, 'rect', 0).setOrigin(0,0.5);
        this.checkpoint.add(this.checkpoint1);
        this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel2, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher); 
        
         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

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