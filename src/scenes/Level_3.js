class Level3 extends Phaser.Scene {
    constructor() {
        super("level3Scene");
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

        this.load.image('lvl3back', './assets/Levels/Level-3/Background-3.PNG');
        this.load.image('lvl3mid', './assets/Levels/Level-3/Midground-3.PNG');
        this.load.image('lvl3fore', './assets/Levels/Level-3/Foreground-3.PNG');

        this.load.image('4x1', './assets/Levels/Blocks/4x1 Block_f.PNG');
        this.load.image('1x4', './assets/Levels/Blocks/4x1 Block_Rf.PNG');

        this.load.image('transparent', './assets/transparent.png');

        this.load.image('water', './assets/Levels/Blocks/Tiles/water.png');

        this.load.image('pg11', './assets/Storyboard/Page (11).jpg');
        this.load.image('pg12', './assets/Storyboard/Page (12).jpg');
        this.load.image('pg13', './assets/Storyboard/Page (13).jpg');

        // TILE MAP
        this.load.image('terrain_tiles', 'assets/Levels/TileMaps/terrain_tiles.png');
        this.load.tilemapTiledJSON('platform_map3', 'assets/Levels/TileMaps/Level3.json');


        this.load.spritesheet('cat', 'assets/Cat/cat_walk_sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.audio('meow', 'assets/meow.wav');

    }

    create() {
        // BACKGROUND STUFF
        
        this.cameras.main.fadeIn(1000);
        // create the Tilemap
	    const map = this.make.tilemap({ key: 'platform_map3' });

        // add the tileset image we are using
        const tileset = map.addTilesetImage('standard_tiles', 'terrain_tiles');

        // "Ground" layer will be on top of "Background" layer
        const groundLayer = map.createLayer('Ground', tileset);

        this.physics.world.TILE_BIAS = 200;

        // (change static values to a variable later)
        this.cameras.main.setBounds(-16000, 3000);
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
        this.player = new Cat(this, -15232, 13568, 'cat', 0).setOrigin(0.5, 0.5).setScale(1);
        //this.player.body.setMaxVelocity(600, 5000);
        this.respawnX = -15232;
        this.respawnY = 13568;

        this.cat_example = this.add.sprite(2100, -750, 'cat', 0).setOrigin(0.5,0.5).setScale(0.5);


        
    
        // TILE MAP COLLIDER
        groundLayer.setCollisionByProperty({ 
            collides: true 
        });

        this.physics.add.collider(this.player, groundLayer);
        groundLayer.setCollisionBetween(0,23);

        // WATER GROUP
        this.water = map.createFromObjects("Objects", {
            name: "water",
            key: "water",
            frame: ""
        });
    
        this.physics.world.enable(this.water, Phaser.Physics.Arcade.STATIC_BODY);
        this.waterGroup = this.add.group(this.water);

        this.physics.add.overlap(this.player, this.waterGroup, (obj1, obj2) => {
            this.Death(obj1);
        })

        // CHECKPOINT TO NEXT LEVEL
        this.checkPoint = map.createFromObjects("Objects", {
            name: "checkpoint",
            key: "transparent",
            frame: ""
        });

        this.physics.world.enable(this.checkPoint, Phaser.Physics.Arcade.STATIC_BODY);
        this.checkpointGroup = this.add.group(this.checkPoint);

        this.physics.add.overlap(this.player, this.checkpointGroup, this.goToLevel4, null, this);
        // this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
        // this.checkpoint1 = this.add.sprite(-6000, 13000, 'rect', 0).setOrigin(0,0.5);
        // this.checkpoint.add(this.checkpoint1);
        // this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel2, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher);

         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);

        

        // RESPAWN POINT GROUP
        this.respawnPoint = map.createFromObjects("Objects", {
            name: "respawn",
            key: "transparent",
            frame: ""
        });

        this.physics.world.enable(this.respawnPoint, Phaser.Physics.Arcade.STATIC_BODY);
        this.respawnGroup = this.add.group(this.respawnPoint);

        this.physics.add.overlap(this.player, this.respawnGroup, (obj1, obj2) => {
            this.respawnX = obj2.x;
            this.respawnY = obj2.y + 1500;
        })

        // FALL DEATH GROUP
        this.deathPoint = map.createFromObjects("Objects", {
            name: "death",
            key: "transparent",
            frame: ""
        });

        this.physics.world.enable(this.deathPoint, Phaser.Physics.Arcade.STATIC_BODY);
        this.deathGroup = this.add.group(this.deathPoint);

        this.physics.add.overlap(this.player, this.deathGroup, (obj1, obj2) => {
            this.Death(obj1);
        });

        // COINS TO COLLECT
        this.coin1 = new Coin(this, -306, 20736, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.08);
        this.coin2 = new Coin(this, -12063, 8960, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.08);
        // this.coin3 = new Coin(this, -50, 5376, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.08);
        this.coin4 = new Coin(this, 4864, 4864, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.08);
        this.coinGroup = this.physics.add.group({allowGravity: false, immovable: true });
        this.coinGroup.add(this.coin1);
        this.coinGroup.add(this.coin2);
        // this.coinGroup.add(this.coin3);
        this.coinGroup.add(this.coin4);
        this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);

        let style = { font: "200px Arial", fill: "#ff0000"};
        this.displayMemoryCounter = 11;
        // coin counter
        this.coinCounter = 0;
        this.totalCoinsCollected = this.add.text(4600, 14000, this.coinCounter, style);
        this.add.text(2300, 14000,'Total memories collected:', style);
        
        // CHARON
        this.charon = this.add.sprite(2813, 15616, 'rect', 0).setOrigin(0.5,0.5).setScale(0.5);
        this.charonMessage =  this.add.text(2300, 14400, 'To cross the river of Styx,\n please collect 3 memories.', style);
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
        console.log('this.coinCounter1', this.coinCounter);
        if (this.coinCounter == 3) {
            console.log('ahhh this.coinCounter', this.coinCounter);
            this.charonMessage.text = 'You have all collected 3 coins. \nI will take you accross the river';
        }
        console.log(this.player.x, this.player.y);


    }

    goToLevel4(player, checkpoint) {
        if (this.coinCounter == 3) {
            console.log('next level 4');
            this.scene.start('charonScene');
            // this.scene.bringToTop('charonScene');
            this.scene.sleep('level1Scene');
            // this.scene.pause('level2Scene');
            // this.scene.pause('level3Scene');
            // this.scene.pause('level4Scene');
            // this.scene.pause('level5Scene');
        }
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

    Death(player, spike) {
        if (this.player.alive == true) {
            player.alive = false;
            this.cameras.main.shake(500);
            this.deathParticles = this.add.particles('smoke');
            this.partEm = this.deathParticles.createEmitter({
                // frame: 'yellow',
                radial: true,
                // x: this.newCannon.x + 100,
                // y: this.newCannon.y,
                lifespan: { min: 1200, max: 2000},
                speed: { min: 50, max: 800 },
                quantity: 500,
                gravityY: 0,
                scale: { start: 4, end: 0, ease: 'Power3' },
                active: true,
                
                follow: player
            });
            this.partEm.explode(100, this.player.x, this.player.y);
            this.player.alpha = 0;

            let fadeout = this.time.addEvent({ delay: 1200, callback: () =>{
                this.cameras.main.fadeOut(500);

                let respawn = this.time.addEvent({ delay: 500, callback: () =>{
                    this.Respawn();
                }});
            }});
        }
    }

    unHurt() {
        this.player.hurt = false;
    }

    Respawn() {
        this.cameras.main.fadeIn(800);
        this.player.setPosition(this.respawnX, this.respawnY);
        this.player.alive = true;
        this.player.alpha = 1;
    }

    collectCoin(player, coin) {
        coin.getCoin();
        this.coinCounter+=1;
        this.totalCoinsCollected.text = this.coinCounter;
        this.story = this.add.sprite(this.player.x, this.player.y - 900, 'pg'+[this.displayMemoryCounter]).setScale(0.5);
        this.story.alpha = 0.5;
        this.displayMemoryCounter+=1;
        
    }
}
