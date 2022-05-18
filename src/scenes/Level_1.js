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
        this.load.image('spikes_D', './assets/Levels/Blocks/1x1 Spikes.PNG');
        this.load.image('spikes_R', './assets/Levels/Blocks/1x1 Spikes_R.PNG');
        this.load.image('spikes_L', './assets/Levels/Blocks/1x1 Spikes_L.PNG');
        this.load.image('spikes_U', './assets/Levels/Blocks/1x1 Spikes_U.PNG');
        this.load.image('back_1', './assets/Levels/Level-1/Background-1.PNG');
        this.load.image('back_2', './assets/Levels/Level-1/Midground-1.PNG');
        this.load.image('back_3', './assets/Levels/Level-1/Foreground-1.PNG');
        this.load.image('4x1', './assets/Levels/Blocks/4x1 Block_f.PNG');
        this.load.image('1x4', './assets/Levels/Blocks/4x1 Block_Rf.PNG');

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
        // this.back_0001 = this.add.sprite(-100, 400, 'back_1', 0).setScale(0.8).setOrigin(0.3,1);
        // this.back_0002 = this.add.sprite(-100, 400, 'back_2', 0).setScale(0.8).setOrigin(0.2,1);
        // this.back_0003 = this.add.sprite(-100, 400, 'back_3', 0).setScale(0.8).setOrigin(0.2,1);

            // set up player character
        this.player = new Cat(this, 11100, -2000, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.15);
        //this.player.body.setMaxVelocity(600, 5000);

        this.cat_example = this.add.sprite(800, 150, 'cat', 0).setOrigin(0.5,0.5).setScale(0.5);


        this.ground = this.add.sprite(game.config.width/2, game.config.height-100, 'rect', 0).setOrigin(0.5,0).setScale(10);
        // this.wall1 = this.add.sprite(game.config.width+900, game.config.height/2, 'rect', 0).setOrigin(0, 0.5).setScale(10);
        // this.wall2 = this.add.sprite(-500, game.config.height/10, 'rect', 0).setOrigin(0, 0).setScale(1);

        this.platg_0000 = this.add.sprite(0, 0, 'platform', 0).setScale(13).setOrigin(0,0);
        this.platg_0001 = this.add.sprite(2900, 0, 'platform', 0).setScale(6).setOrigin(0,0);
        this.platg_0002 = this.add.sprite(4000, 100, 'platform', 0).setScale(6).setOrigin(0,0);
        this.platg_0003 = this.add.sprite(5100, 0, 'platform', 0).setScale(3).setOrigin(0,0);
        this.platg_0004 = this.add.sprite(5200, 100, 'platform', 0).setScale(4).setOrigin(0,0);
        this.platg_0005 = this.add.sprite(5700, 200, 'platform', 0).setScale(3).setOrigin(0,0);
        this.platg_0006 = this.add.sprite(5400, 300, 'platform', 0).setScale(6).setOrigin(0,0);
        this.platg_0007 = this.add.sprite(7800, 100, 'platform', 0).setScale(8).setOrigin(0,0);
        this.platg_0008 = this.add.sprite(9100, -400, 'platform', 0).setScale(3).setOrigin(0,0);
        this.platg_0009 = this.add.sprite(9600, -200, 'platform', 0).setScale(3).setOrigin(0,0);
        this.platg_0010 = this.add.sprite(9100, -200, 'platform', 0).setScale(3).setOrigin(0,0);
        this.platg_0011 = this.add.sprite(9100, 0, 'platform', 0).setScale(3).setOrigin(0,0);
        this.platg_0012 = this.add.sprite(10100, -700, 'platform', 0).setScale(6).setOrigin(0,0);
        this.platg_0013 = this.add.sprite(10200, -1660, 'platform', 0).setScale(3).setOrigin(0,1);
        this.platg_0014 = this.add.sprite(10800, -1660, 'platform', 0).setScale(3).setOrigin(0,1);
        this.platg_0015 = this.add.sprite(9880, -2160, 'platform', 0).setScale(5.8).setOrigin(0,1);
        this.platg_0016 = this.add.sprite(9880, -2500, 'platform', 0).setScale(5.8).setOrigin(0,1);
        this.platg_0017 = this.add.sprite(9880, -2800, 'platform', 0).setScale(5.8).setOrigin(0,1);
        this.platg_0018 = this.add.sprite(11700, -1660, 'platform', 0).setScale(3).setOrigin(0,1);
        this.platg_0019 = this.add.sprite(13050, -2100, 'platform', 0).setScale(6).setOrigin(0,0);

        this.wall_0000 = this.add.sprite(8900, -400, '4x1', 0).setScale(0.5).setOrigin(0,0);
        this.wall_0001 = this.add.sprite(8500, -700, '4x1', 0).setScale(0.3).setOrigin(0,0);
        this.wall_0002 = this.add.sprite(8400, -700, '4x1', 0).setScale(0.28).setOrigin(0,0);
        this.wall_0003 = this.add.sprite(8330, -700, '4x1', 0).setScale(0.25).setOrigin(0,0);
        this.wall_0004 = this.add.sprite(10000, -700, '4x1', 0).setScale(0.3).setOrigin(0,0);
        this.wall_0005 = this.add.sprite(9600, -1200, '4x1', 0).setScale(0.3).setOrigin(0,0);
        this.wall_0006 = this.add.sprite(10850, -500, '4x1', 0).setScale(0.65).setOrigin(0,1);
        this.wall_0007 = this.add.sprite(9400, -950, '4x1', 0).setScale(0.28).setOrigin(1,1);
        this.wall_0008 = this.add.sprite(11300, -2300, '4x1', 0).setScale(0.3).setOrigin(0,0);
        this.wall_0009 = this.add.sprite(11400, -2300, '4x1', 0).setScale(0.3).setOrigin(0,0);
        this.wall_0010 = this.add.sprite(11500, -2300, '4x1', 0).setScale(0.3).setOrigin(0,0);
        this.wall_0011 = this.add.sprite(11600, -2100, '4x1', 0).setScale(0.3).setOrigin(0,0);
        this.wall_0012 = this.add.sprite(12100, -2100, '4x1', 0).setScale(0.3).setOrigin(0,1);
        this.wall_0013 = this.add.sprite(13000, -2100, '4x1', 0).setScale(0.3).setOrigin(0,0);



        this.plat_0001 = this.add.sprite(820, 286, 'platform', 0);
        this.plat_0002 = this.add.sprite(3600, -10, 'plat_2', 0).setScale(0.2);
        this.plat_0003 = this.add.sprite(4500, -200, 'platform', 0);
        this.plat_0004 = this.add.sprite(4700, -200, 'platform', 0);
        this.plat_0005 = this.add.sprite(6600, 300, 'platform', 0).setOrigin(0,0);
        this.plat_0006 = this.add.sprite(7200, 0, 'platform', 0).setOrigin(0,0);
        this.plat_0007 = this.add.sprite(7100, 400, 'platform', 0).setOrigin(0,0);
        this.plat_0008 = this.add.sprite(7600, 100, 'platform', 0).setOrigin(0,0);
        this.plat_0009 = this.add.sprite(8600, -470, 'platform', 0).setScale(3).setOrigin(1,0);
        this.plat_0010 = this.add.sprite(8600, -665, 'platform', 0).setScale(3).setOrigin(1,0);
        this.plat_0011 = this.add.sprite(9100, -665, 'platform', 0).setScale(1).setOrigin(0,0);
        this.plat_0012 = this.add.sprite(9200, -665, 'platform', 0).setScale(1).setOrigin(0,0);
        this.plat_0013 = this.add.sprite(9700, -1100, '1x4', 0).setScale(0.3).setOrigin(0,0);
        this.plat_0014 = this.add.sprite(10000, -1100, '1x4', 0).setScale(0.3).setOrigin(0,0);
        this.plat_0015 = this.add.sprite(9900, -1350, 'platform', 0).setScale(1).setOrigin(0,0);
        this.plat_0016 = this.add.sprite(10050, -1350, 'platform', 0).setScale(1).setOrigin(0,0);
        this.plat_0017 = this.add.sprite(9350, -1492, 'platform', 0).setScale(1.5).setOrigin(1,0);
        this.plat_0018 = this.add.sprite(9350, -1392, 'platform', 0).setScale(2.5).setOrigin(1,0);
        this.plat_0019 = this.add.sprite(9350, -1280, 'platform', 0).setScale(3.5).setOrigin(1,0);
        this.plat_0020 = this.add.sprite(9350, -1185, 'platform', 0).setScale(3.5).setOrigin(1,0);
        this.plat_0021 = this.add.sprite(9700, -1800, '1x4', 0).setScale(0.3).setOrigin(0,0);
        this.plat_0022 = this.add.sprite(12450, -2500, '1x4', 0).setScale(0.3).setOrigin(0,0);
        this.plat_0023 = this.add.sprite(12500, -1750, 'platform', 0).setScale(1).setOrigin(0,0);
        this.plat_0024 = this.add.sprite(12850, -1600, 'platform', 0).setScale(1).setOrigin(0,0);

        this.sp_0003 = this.add.sprite(3558, -140, 'spikes_D', 0).setScale(0.2);
        this.sp_0004 = this.add.sprite(3635, -140, 'spikes_D', 0).setScale(0.2);
        this.sp_0005 = this.add.sprite(6600, 400, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0006 = this.add.sprite(6600, 500, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0007 = this.add.sprite(7700, 300, 'spikes_R', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0008 = this.add.sprite(7700, 200, 'spikes_R', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0009 = this.add.sprite(7700, 100, 'spikes_R', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0010 = this.add.sprite(8000, -370, 'spikes_R', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0011 = this.add.sprite(8000, -470, 'spikes_R', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0012 = this.add.sprite(8000, -570, 'spikes_R', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0012 = this.add.sprite(8000, -670, 'spikes_R', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0013 = this.add.sprite(8630, -780, 'spikes_D', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0014 = this.add.sprite(8530, -780, 'spikes_D', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0015 = this.add.sprite(8430, -780, 'spikes_D', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0016 = this.add.sprite(8330, -750, 'spikes_D', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0017 = this.add.sprite(8230, -750, 'spikes_D', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0018 = this.add.sprite(8130, -750, 'spikes_D', 0).setScale(0.2).setOrigin(1,0);
        this.sp_0019 = this.add.sprite(9700, -200, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0020 = this.add.sprite(9800, -200, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0021 = this.add.sprite(9900, -200, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0022 = this.add.sprite(9610, -1180, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0023 = this.add.sprite(9640, -1180, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0024 = this.add.sprite(8950, -1380, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0025 = this.add.sprite(8850, -1380, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0026 = this.add.sprite(8750, -1280, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0027 = this.add.sprite(8650, -1280, 'spikes_D', 0).setScale(0.2).setOrigin(0,1);
        this.sp_0028 = this.add.sprite(8650, -960, 'spikes_U', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0029 = this.add.sprite(8750, -960, 'spikes_U', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0030 = this.add.sprite(8850, -960, 'spikes_U', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0031 = this.add.sprite(11025, -2270, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0032 = this.add.sprite(11025, -2370, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0033 = this.add.sprite(11025, -2470, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0034 = this.add.sprite(11025, -2570, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0035 = this.add.sprite(11025, -2670, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0036 = this.add.sprite(11025, -2770, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0037 = this.add.sprite(11025, -2870, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);
        this.sp_0038 = this.add.sprite(11025, -2970, 'spikes_L', 0).setScale(0.2).setOrigin(0,0);


        this.rock1 = this.add.sprite(1100, 80, 'block_1', 0).setScale(0.6);
        this.rock2 = this.add.sprite(2000, -20, 'block_1', 0).setScale(0.5);

    

        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true, checkCollision: false } );
        this.physics.add.collider(this.player, this.platformGroup);

        this.platformGroup.add(this.ground);
        // this.platformGroup.add(this.wall1);
        // this.platformGroup.add(this.wall2);
        this.platformGroup.add(this.platg_0000);
        this.platformGroup.add(this.platg_0001);
        this.platformGroup.add(this.platg_0002);
        this.platformGroup.add(this.platg_0003);
        this.platformGroup.add(this.platg_0004);
        this.platformGroup.add(this.platg_0005);
        this.platformGroup.add(this.platg_0006);
        this.platformGroup.add(this.platg_0007);
        this.platformGroup.add(this.platg_0008);
        this.platformGroup.add(this.platg_0009);
        this.platformGroup.add(this.platg_0012);
        this.platformGroup.add(this.platg_0013);
        this.platformGroup.add(this.platg_0014);
        this.platformGroup.add(this.platg_0015);
        this.platformGroup.add(this.platg_0016);
        this.platformGroup.add(this.platg_0018);
        this.platformGroup.add(this.platg_0019);

        this.platformGroup.add(this.wall_0000);
        this.platformGroup.add(this.wall_0001);
        this.platformGroup.add(this.wall_0002);
        this.platformGroup.add(this.wall_0003);
        this.platformGroup.add(this.wall_0004);
        this.platformGroup.add(this.wall_0005);
        this.platformGroup.add(this.wall_0006);
        this.platformGroup.add(this.wall_0007);
        this.platformGroup.add(this.wall_0008);
        this.platformGroup.add(this.wall_0009);
        this.platformGroup.add(this.wall_0010);
        this.platformGroup.add(this.wall_0011);
        this.platformGroup.add(this.wall_0012);
        this.platformGroup.add(this.wall_0013);

        this.platformGroup.add(this.plat_0001);
        this.platformGroup.add(this.plat_0002);
        this.platformGroup.add(this.plat_0003);
        this.platformGroup.add(this.plat_0004);
        this.platformGroup.add(this.plat_0005);
        this.platformGroup.add(this.plat_0006);
        this.platformGroup.add(this.plat_0007);
        this.platformGroup.add(this.plat_0008);
        this.platformGroup.add(this.plat_0009);
        this.platformGroup.add(this.plat_0010);
        this.platformGroup.add(this.plat_0011);
        this.platformGroup.add(this.plat_0012);
        this.platformGroup.add(this.plat_0013);
        this.platformGroup.add(this.plat_0014);
        this.platformGroup.add(this.plat_0015);
        this.platformGroup.add(this.plat_0016);
        this.platformGroup.add(this.plat_0017);
        this.platformGroup.add(this.plat_0018);
        this.platformGroup.add(this.plat_0019);
        this.platformGroup.add(this.plat_0020);
        this.platformGroup.add(this.plat_0021);
        this.platformGroup.add(this.plat_0022);
        this.platformGroup.add(this.plat_0023);
        this.platformGroup.add(this.plat_0024);

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
        this.add.text(0,-400,'SPACE to jump', style);

        this.add.text(13800,-2400,'END', style);

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
        // this.back_0001.x = this.player.x/1.3;
        // this.back_0002.x = this.player.x/3;
        // this.back_0003.x = this.player.x/4;

        console.log(this.player.x);


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