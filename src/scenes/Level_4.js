class Level4 extends Phaser.Scene {
    constructor() {
        super("level4Scene");
    }

    preload() {
        this.load.image('rect', './assets/white-square.png');

        this.load.image('boulder', './assets/Levels/Blocks/1x1 Boulder.PNG');
        this.load.image('block_1', './assets/Levels/Blocks/1x1 Block.PNG');
        this.load.image('plat_1', './assets/Levels/Blocks/Platform Large.PNG');
        this.load.image('plat_2', './assets/Levels/Blocks/Platform Small.PNG');
        this.load.image('spikes_D', './assets/Levels/Blocks/1x1 Spikes.PNG');
        this.load.image('spikes_R', './assets/Levels/Blocks/1x1 Spikes_R.PNG');
        this.load.image('spikes_L', './assets/Levels/Blocks/1x1 Spikes_L.PNG');
        this.load.image('spikes_U', './assets/Levels/Blocks/1x1 Spikes_U.PNG');
        this.load.image('back_1', './assets/Levels/Level-1/Background-1.PNG');
        this.load.image('back_2', './assets/Levels/Level-1/Midground-1.PNG');
        this.load.image('back_3', './assets/Levels/Level-1/Foreground-1.PNG');
        this.load.image('4x1', './assets/Levels/Blocks/4x1 Block_f.PNG');
        this.load.image('1x4', './assets/Levels/Blocks/4x1 Block_Rf.PNG');
        this.load.image('s_plat', './assets/Levels/Blocks/Platform Small.PNG');

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

        // Falling Platform Group
        this.fallPlatGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.player, this.fallPlatGroup, this.fallActivate);

        // this.f_plat1 = this.add.sprite(400, 400, 's_plat', 0).setOrigin(0,0).setScale(0.3);
        this.f_plat1 = this.add.sprite(800, 500, 'platform_vert', 0).setOrigin(0, 0);

        // let t = this.tweens.add({
        //     targets: this.f_plat1,
        //     y: 700,
        //     duration: 3000,
        //     ease: 'Linear',
        //     yoyo: false,
        // });
        // t.restart();
        this.fallPlatGroup.add(this.f_plat1);
        // this.physics.add.collider(this.player, this.f_plat1, this.fallActivate);

        // this.physics.add.overlap(this.player, this.f_plat1, this.fallActivate, null, this);

         // CHECKPOINT
         this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
         this.checkpoint1 = this.add.sprite(1800, game.config.height - 200, 'rect', 0).setOrigin(0,0.5);
         this.checkpoint.add(this.checkpoint1);
         this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel5, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher);  

        var style = { font: "20px Arial", fill: "#ffffff" };
        this.add.text(100,100,'level 4', style)
        this.add.text(1800,100,'level 4', style);

        // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update() {
        this.player.update();
    }

    goToLevel5(player, checkpoint) {
        this.scene.start('level5Scene');
        this.scene.bringToTop('level5Scene');
        this.scene.pause('level1Scene');
        this.scene.pause('level2Scene');
        this.scene.pause('level3Scene');
        this.scene.pause('level4Scene');
    }

    fallActivate(player, plat) {
        console.log('check');
        // plat.body.allowGravity = true;
        plat.body.setVelocityY(100);
    }

}