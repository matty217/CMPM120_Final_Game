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

        // this.load.image('water', './assets/Levels/Blocks/Tiles/water.png');
        this.load.image('water', './assets/Levels/Blocks/Tiles/lava.png');
        

        this.load.image('pg14', './assets/Storyboard/Page (14).jpg');
        this.load.image('pg15', './assets/Storyboard/Page (15).jpg');
        this.load.image('pg16', './assets/Storyboard/Page (16).jpg');

        this.load.image('charon', './assets/Levels/Charon/unnamed.png');
        
        this.load.spritesheet('coin', './assets/Levels/Blocks/Tiles/Coin Sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });
        // TILE MAP
        this.load.image('terrain_tiles', 'assets/Levels/TileMaps/terrain_tiles.png');
        this.load.tilemapTiledJSON('platform_map3', 'assets/Levels/TileMaps/Level3.json');


        this.load.spritesheet('cat', 'assets/Cat/cat_walk_sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.audio('meow', 'assets/meow.wav');
        this.load.audio('lvl3music', './assets/Sounds/Music/Level 3/Ketsa - Never Forget.mp3')

    }

    create() {
        this.scene.launch('pauseScene');
        game.scene.bringToTop('pauseScene');
        game.currentScene = 'level3Scene';


        this.game.sound.stopAll();
        this.lvl3music = this.sound.add('lvl3music', {volume: 0.3});
        this.lvl3music.loop = true;
        this.lvl3music.play();
        // BACKGROUND STUFF

        this.back1 = this.add.sprite(-800, 2500, 'lvl3back', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back2 = this.add.sprite(6000, 2500, 'lvl3back', 0).setScale(3).setScrollFactor(0.2,0.2);

        // midground
        this.mid1 = this.add.sprite(-2100, 4000, 'lvl3mid', 0).setScale(3).setScrollFactor(0.3,0.3);
        this.mid2 = this.add.sprite(6000, 4000, 'lvl3mid', 0).setScale(3).setScrollFactor(0.3,0.3);

        this.topMid1  = this.add.sprite(-2100, -2000, 'lvl3mid', 0).setScale(3).setScrollFactor(0.3,0.3);
        this.topMid2 = this.add.sprite(6000, -2000, 'lvl3mid', 0).setScale(3).setScrollFactor(0.3,0.3);

        this.bottomMid1  = this.add.sprite(-2100, 10000, 'lvl3mid', 0).setScale(3).setScrollFactor(0.3,0.3);
        this.bottomMid2 = this.add.sprite(6000, 10000, 'lvl3mid', 0).setScale(3).setScrollFactor(0.3,0.3);

        // foreground
        this.fore1 = this.add.sprite(-4300, 5000, 'lvl3fore', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore2 = this.add.sprite(2500, 5000, 'lvl3fore', 0).setScale(2.5).setScrollFactor(0.4,0.4);

        this.topFore1 = this.add.sprite(-4300, 400, 'lvl3fore', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.topFore2 = this.add.sprite(2500, 400, 'lvl3fore', 0).setScale(2.5).setScrollFactor(0.4,0.4);

        this.bottomFore1 = this.add.sprite(-4300, 10000, 'lvl3fore', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.bottomFore2 = this.add.sprite(2500, 10000, 'lvl3fore', 0).setScale(2.5).setScrollFactor(0.4,0.4);
       
        // coin animation
        const coinAnimate = this.anims.create({
            key: 'coinAnimate',
            frames: this.anims.generateFrameNames('coin', {
                start: 0,
                end: 6
            }),
            frameRate: 12,
            repeat: -1
        });

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

        this.cameras.main.setBackgroundColor('#6a8b7b');

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);



            // set up player character
        this.player = new Cat(this, -15232, 13568, 'cat', 0).setOrigin(0.5, 0.5).setScale(1)
        .setSize(400, 300)
        .setOffset(50, 150);
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
            this.respawnY = obj2.y;
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

        // Level End Group
        this.levelEnd = map.createFromObjects("Objects", {
            name: "Level_End",
            key: "heart",
            frame: "2"
        });
    
        this.physics.world.enable(this.levelEnd, Phaser.Physics.Arcade.STATIC_BODY);
        this.levelEndGroup = this.add.group(this.levelEnd);

        this.physics.add.overlap(this.player, this.levelEndGroup, (obj1, obj2) => {
            this.partEmHeart.explode(30);
        })

        // COINS TO COLLECT
        this.coin1 = new Coin(this, -306, 20736, 'coin', 0).setOrigin(0.5, 0.5).setSize(128, 128);
        this.coin1.play({ key: 'coinAnimate', repeat: 1000 });

        this.coin2 = new Coin(this, -12063, 8960, 'coin', 0).setOrigin(0.5, 0.5).setSize(128, 128);
        this.coin2.play({ key: 'coinAnimate', repeat: 1000 });

        // this.coin3 = new Coin(this, -50, 5376, 'rect', 0).setOrigin(0.5, 0.5).setScale(0.08);
        this.coin4 = new Coin(this, 4864, 4864, 'coin', 0).setOrigin(0.5, 0.5).setSize(128, 128);
        this.coin4.play({ key: 'coinAnimate', repeat: 1000 });

        this.coinGroup = this.physics.add.group({allowGravity: false, immovable: true });
        this.coinGroup.add(this.coin1);
        this.coinGroup.add(this.coin2);
        // this.coinGroup.add(this.coin3);
        this.coinGroup.add(this.coin4);
        this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);

        let style = {
            fontSize: '200px',
            fontFamily: 'amaticSC',
            // backgroundColor: '#637a68',
            color: '#dddace',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5
            },
            shadow: {
              offsetY: 5,
              color: '#fff6c2',
              blur: 30,
              stroke: true,
              fill: true
          }, padding: {
              left: 60,
              right: 60,
              top: 60,
              bottom: 60,
          },
        }
        this.displayMemoryCounter = 14;
        // coin counter
        this.coinCounter = 0;
        this.totalCoinsCollected = this.add.text(2600, 13700, this.coinCounter, style);
        this.add.text(1000, 13700,'Total memories collected:', style);
        
        // CHARON
        this.charon = this.add.sprite(2813, 15216, 'charon', 0).setOrigin(0.5,0.5).setScale(4);
        this.charonMessage =  this.add.text(1000, 14000, 'To cross the river of Styx,\n please collect 3 memories.', style);
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


        // heart at end
        this.heartParticles = this.add.particles('red_part');
        this.partEmHeart = this.heartParticles.createEmitter({
            radial: true,
            lifespan: { min: 800, max: 1500},
            speed: { min: 2000, max: 3000 },
            quantity: 0,
            gravityY: 2000,
            scale: { start: 4, end: 0, ease: 'Power3' },
            active: true,
            mode: 'ADD',
            x: 5144,
            y: 14818
        });
    }

    update() {
        this.player.update();


        Phaser.Actions.Call(this.levelEndGroup.getChildren(), function(heart) {
            if (this.coinCounter1 != 3) {
                heart.alpha = 0;
            } else {
                heart.alpha = 1;
            };
          }, this);

        // BACKGROUND
        // this.back_0001.x = this.player.x/1.3;
        // this.back_0002.x = this.player.x/3;
        // this.back_0003.x = this.player.x/4;
        console.log('this.coinCounter1', this.coinCounter);
        if (this.coinCounter == 3) {
            console.log('ahhh this.coinCounter', this.coinCounter);
            this.charonMessage.text = 'You have collected all 3 memories. \nI will take you accross the river';
        }
        console.log(this.player.x, this.player.y);


    }

    goToLevel4(player, checkpoint) {
        if (this.coinCounter == 3) {
            this.lvl3music.stop();
            console.log('next level 4');
            this.scene.start('charonScene');
            this.scene.bringToTop('charonScene');
            this.scene.sleep('level1Scene');
            this.scene.sleep('level2Scene');
            this.scene.sleep('level3Scene');
            this.scene.sleep('level4Scene');
            this.scene.sleep('level5Scene');
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
            game.sfxDeath.play();

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
        this.story.alpha = 0.8;
        this.displayMemoryCounter+=1;
        
    }
}
