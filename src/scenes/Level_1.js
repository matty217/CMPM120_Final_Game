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
        this.load.image('back_4', './assets/Levels/Level-1/back_brown.png');
        this.load.image('4x1', './assets/Levels/Blocks/4x1 Block_f.PNG');
        this.load.image('1x4', './assets/Levels/Blocks/4x1 Block_Rf.PNG');

        // TILE MAP
        this.load.image('terrain_tiles', 'assets/Levels/TileMaps/terrain_tiles.png');
        this.load.tilemapTiledJSON('platform_map', 'assets/Levels/TileMaps/Level1.json');


        this.load.spritesheet('cat', 'assets/Cat/cat_walk_sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.audio('meow', 'assets/meow.wav');

    }

    create() {
        // BACKGROUND STUFF
        //this.background = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0x444444).setOrigin(0.5,0.5);
        this.back_0001 = this.add.sprite(-1000, 2500, 'back_1', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back_0002 = this.add.sprite(5800, 2500, 'back_1', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back_0003 = this.add.sprite(12600, 2500, 'back_1', 0).setScale(3).setScrollFactor(0.2,0.2);

        this.mid_0001 = this.add.sprite(-1000, 2500, 'back_2', 0).setScale(2.5).setScrollFactor(0.3,0.3);
        this.mid_0002 = this.add.sprite(5800, 2500, 'back_2', 0).setScale(2.5).setScrollFactor(0.3,0.3);
        this.mid_0002 = this.add.sprite(12600, 2500, 'back_2', 0).setScale(2.5).setScrollFactor(0.3,0.3);


        this.fore_0001 = this.add.sprite(-1000, 3500, 'back_3', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore_0002 = this.add.sprite(5800, 3500, 'back_3', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore_0002 = this.add.sprite(12600, 3500, 'back_3', 0).setScale(2.5).setScrollFactor(0.4,0.4);


        this.back_brown = this.add.sprite(-1000, 8500, 'back_4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.back_brown = this.add.sprite(5800, 8500, 'back_4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.back_brown = this.add.sprite(12600, 8500, 'back_4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);


        
        // create the Tilemap
	    const map = this.make.tilemap({ key: 'platform_map' });

        // add the tileset image we are using
        const tileset = map.addTilesetImage('standard_tiles', 'terrain_tiles');
        
        // create the layers we want in the right order
        const backLayer = map.createLayer('Background', tileset);

        // "Ground" layer will be on top of "Background" layer
        const groundLayer = map.createLayer('Ground', tileset);

        this.physics.world.TILE_BIAS = 200;

        // (change static values to a variable later)
        this.cameras.main.setBounds(-8000, 0);
        this.cameras.main.setZoom(0.2, 0.2);
        //this.physics.world.setBounds(0, 0, 20000, 10000);
        //this.physics.world.removeBounds(0, 0, 20000, 10000);

        this.cameras.main.setBackgroundColor('#5f4e48');

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);



            // set up player character
        this.player = new Cat(this, -5000, 12000, 'cat', 0).setOrigin(0.5, 0.5).setScale(1);
        //this.player.body.setMaxVelocity(600, 5000);

        this.cat_example = this.add.sprite(2100, -750, 'cat', 0).setOrigin(0.5,0.5).setScale(0.5);


        
    
        // TILE MAP COLLIDER
        groundLayer.setCollisionByProperty({ 
            collides: true 
        });

        this.physics.add.collider(this.player, groundLayer);
        groundLayer.setCollisionBetween(0,23);

       

        // use checkpoint to go to next level
        this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
        this.checkpoint1 = this.add.sprite(-6000, 13000, 'rect', 0).setOrigin(0,0.5);
        this.checkpoint.add(this.checkpoint1);
        this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel2, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher);

         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);

        var style = { font: "20px Arial", fill: "#ffffff" };
        this.add.text(200,-200,'WASD to move', style);
        this.add.text(1000,-300,'SPACE to jump', style);
        this.add.text(11400,-2200,'W to climb', style);

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
    }

    update() {
        this.player.update();


        // BACKGROUND
        // this.back_0001.x = this.player.x/1.3;
        // this.back_0002.x = this.player.x/3;
        // this.back_0003.x = this.player.x/4;

        console.log(this.player.body.velocity.x);


    }

    goToLevel2(player, checkpoint) {
        game.scene.start('level2Scene');
        game.scene.bringToTop('level2Scene');
        game.scene.pause('level1Scene');
        game.scene.pause('level3Scene');
        game.scene.pause('level4Scene');
        game.scene.pause('level5Scene');
    }

    spikeHurt(player, spike) {
        if (!player.hurt) {
            player.hurt = true;
            this.cameras.main.shake(100);
            if (this.player.hurt == true) {
                let unHurt = this.time.addEvent({ delay: 1000, callback: () =>{
                    this.unHurt();
                }});
            }
        }
    }

    unHurt() {
        this.player.hurt = false;
    }
}
