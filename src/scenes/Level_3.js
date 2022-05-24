class Level3 extends Phaser.Scene {
    constructor() {
        super("level3Scene");
    }

    preload() {
        this.load.image('rect', './assets/white-square.png');
        this.load.image('platform', './assets/platform.png');
        this.load.image('platform_vert', './assets/platform_vert.png');

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

        // this.ground = this.add.sprite(game.config.width/2, game.config.height-100, 'rect', 0).setOrigin(0.5,0).setScale(10);
        this.wall1 = this.add.sprite(game.config.width+900, game.config.height/2, 'rect', 0).setOrigin(0, 0.5).setScale(10);
        this.wall2 = this.add.sprite(-200, game.config.height/2, 'rect', 0).setOrigin(0, 0).setScale(0.5);

        this.plat1 = this.add.sprite(1020, 200, 'platform', 0);
        this.plat2 = this.add.sprite(1220, 200, 'platform', 0);
        this.plat3 = this.add.sprite(1420, 200, 'platform', 0);
        this.plat4 = this.add.sprite(1620, 200, 'platform', 0);
        this.plat5 = this.add.sprite(1690, 100, 'platform_vert', 0);
        this.plat6 = this.add.sprite(700, 250, 'platform', 0).setScale(0.5);
        this.plat19 = this.add.sprite(500, 300, 'platform', 0).setScale(0.5);
        this.plat7 = this.add.sprite(400, 450, 'platform', 0).setScale(0.5);
        this.plat8 = this.add.sprite(400, 565, 'platform_vert', 0);
        this.plat9 = this.add.sprite(460, 700, 'platform', 0);
        this.plat10 = this.add.sprite(660, 700, 'platform', 0);
        this.plat11 = this.add.sprite(860, 700, 'platform', 0);
        this.plat12 = this.add.sprite(1060, 700, 'platform', 0);
        this.plat13 = this.add.sprite(1260, 700, 'platform', 0);
        this.plat14 = this.add.sprite(1330, 600, 'platform_vert', 0);
        this.plat15 = this.add.sprite(1260, 500, 'platform', 0);
        this.plat16 = this.add.sprite(1460, 500, 'platform', 0);
        this.plat17 = this.add.sprite(1660, 500, 'platform', 0);
        this.plat18 = this.add.sprite(200, 500, 'platform', 0).setScale(0.5);

        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.player, this.platformGroup);
 

        // this.platformGroup.add(this.ground);
        this.platformGroup.add(this.wall1);
        this.platformGroup.add(this.wall2);
        this.platformGroup.add(this.plat1);
        this.platformGroup.add(this.plat2);
        this.platformGroup.add(this.plat3);
        this.platformGroup.add(this.plat4);
        this.platformGroup.add(this.plat5);
        this.platformGroup.add(this.plat6);
        this.platformGroup.add(this.plat7);
        this.platformGroup.add(this.plat8);
        this.platformGroup.add(this.plat9);
        this.platformGroup.add(this.plat10);
        this.platformGroup.add(this.plat11);
        this.platformGroup.add(this.plat12);
        this.platformGroup.add(this.plat13);
        this.platformGroup.add(this.plat14);
        this.platformGroup.add(this.plat15);
        this.platformGroup.add(this.plat16);
        this.platformGroup.add(this.plat17);
        this.platformGroup.add(this.plat18);
        this.platformGroup.add(this.plat19);

        // COINS TO COLLECT
        this.coin1 = new Coin(this, 800, 600, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.08);
        this.coin2 = new Coin(this, 1000, 600, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.08);
        this.coinGroup = this.physics.add.group({allowGravity: false, immovable: true });
        this.coinGroup.add(this.coin1);
        this.coinGroup.add(this.coin2);
        this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);

        // coin counter
        this.coinCounter = 0;
        this.totalCoinsCollected = this.add.text(720, 100, this.coinCounter, style);
        this.add.text(500,100,'Total coins collected:', style);
        
        // use checkpoint to go to next level
        this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
        this.checkpoint1 = this.add.sprite(1800, game.config.height - 200, 'rect', 0).setOrigin(0,0.5);
        this.checkpoint.add(this.checkpoint1);
        this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel4, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher);  

        // text to identify level for debug (delete later when backgrounds are put in)
        var style = { font: "20px Arial", fill: "#ffffff" };
        this.add.text(100,100,'level 3', style);
        this.add.text(1800,100,'level 3', style);

        // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    
        

    }

    update() {
        this.player.update();
        console.log("coincounter", this.coinCounter);
        this.totalCoinsCollected.text = this.coinCounter;


        
    }

    goToLevel4(player, checkpoint) {
        console.log('next level 4');
        this.scene.start('level4Scene');
        this.scene.bringToTop('level4Scene');
        this.scene.pause('level1Scene');
        this.scene.pause('level2Scene');
        this.scene.pause('level3Scene');
        this.scene.pause('level5Scene');
    }

    collectCoin(player, coin) {
        coin.getCoin();
        this.coinCounter+=1;
    }

}