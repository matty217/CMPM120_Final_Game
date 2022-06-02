class Level4 extends Phaser.Scene {
    constructor() {
        super("level4Scene");
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

        this.load.image('bg1', './assets/Levels/Level-4/Background-4.PNG');
        this.load.image('bg2', './assets/Levels/Level-4/Midground-4.PNG');
        this.load.image('bg3', './assets/Levels/Level-4/Foreground-4.PNG');
        this.load.image('bg4', './assets/Levels/Level-4/Sky-4.PNG');

        this.load.image('4x1', './assets/Levels/Blocks/4x1 Block_f.PNG');
        this.load.image('1x4', './assets/Levels/Blocks/4x1 Block_Rf.PNG');


        this.load.image('transparent', './assets/transparent.png');
        // TILE MAP
        this.load.image('terrain_tiles', 'assets/Levels/TileMaps/terrain_tiles.png');
        this.load.tilemapTiledJSON('platform_map4', 'assets/Levels/TileMaps/Level4.json');


        this.load.spritesheet('cat', 'assets/Cat/cat_walk_sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });

        this.load.spritesheet("tile_sheet", "assets/Levels/TileMaps/terrain_tiles.png", {
            frameWidth: 512,
            frameHeight: 512
        });

        this.load.audio('meow', 'assets/meow.wav');

    }

    create() {
        // BACKGROUND STUFF
        this.cameras.main.fadeIn(1000);
        // this.physics.enable(sky, Phaser.Physics.ARCADE);
        this.topSky1 = this.add.sprite(-5000, 4500, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.topSky2 = this.add.sprite(1800, 4500, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.topSky3 = this.add.sprite(8600, 4500, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.topSky4 = this.add.sprite(15400, 4500, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);

        this.sky1 = this.add.sprite(-5000, 5000, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.sky2 = this.add.sprite(1800, 5000, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.sky3 = this.add.sprite(8600, 5000, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        this.sky4 = this.add.sprite(15400, 5000, 'bg4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);

        this.back1 = this.add.sprite(-1000, 2500, 'bg1', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back2 = this.add.sprite(5800, 2500, 'bg1', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back3 = this.add.sprite(12600, 2500, 'bg1', 0).setScale(3).setScrollFactor(0.2,0.2);

        this.mid1 = this.add.sprite(-2500, 4000, 'bg2', 0).setScale(2.5).setScrollFactor(0.3,0.3);
        this.mid2 = this.add.sprite(4300, 4000, 'bg2', 0).setScale(2.5).setScrollFactor(0.3,0.3);
        this.mid3 = this.add.sprite(11100, 4000, 'bg2', 0).setScale(2.5).setScrollFactor(0.3,0.3);


        this.fore1 = this.add.sprite(-4000, 5000, 'bg3', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore2 = this.add.sprite(2800, 5000, 'bg3', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore3 = this.add.sprite(9600, 5000, 'bg3', 0).setScale(2.5).setScrollFactor(0.4,0.4);


       

        // create the Tilemap
	    const map = this.make.tilemap({ key: 'platform_map4' });

        // add the tileset image we are using
        const tileset = map.addTilesetImage('standard_tiles', 'terrain_tiles');
        
        // create the layers we want in the right order
        const backLayer = map.createLayer('Background', tileset);

        // "Ground" layer will be on top of "Background" layer
        const groundLayer = map.createLayer('Ground', tileset);

        const platformLayer = map.createLayer('Platforms', tileset);

        this.physics.world.TILE_BIAS = 200;

        // (change static values to a variable later)
        this.cameras.main.setBounds(-15000, 7000);
        this.cameras.main.setZoom(0.2, 0.2);
        //this.physics.world.setBounds(0, 0, 20000, 10000);
        //this.physics.world.removeBounds(0, 0, 20000, 10000);

        this.cameras.main.setBackgroundColor('#5f4e48');

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



            // set up player character
        this.player = new Cat(this, -14000, 12000, 'cat', 0).setOrigin(0.5, 0.5).setScale(1);
        //this.player.body.setMaxVelocity(600, 5000);
        this.respawnX = -14000;
        this.respawnY = 12000;
        this.cat_example = this.add.sprite(2100, -750, 'cat', 0).setOrigin(0.5,0.5).setScale(0.5);


        
    
        // TILE MAP COLLIDER
        groundLayer.setCollisionByProperty({ 
            collides: true 
        });
        this.physics.add.collider(this.player, groundLayer);
        groundLayer.setCollisionBetween(0,23);

        platformLayer.setCollisionByProperty({ 
            collides: true 
        });
        this.physics.add.collider(this.player, platformLayer);
        platformLayer.setCollisionBetween(0,23);
       
        // FALLING PLATFORMS
        this.fallPlat1 = map.createFromObjects("Objects", [
            {
                name: "fp1",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp2",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            {
                name: "fp3",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp4",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            // {
            //     name: "fp8",
            //     key: "tile_sheet",
            //     frame: 4,
            //     classType: FallingPlatform
            // }, 
            // {
            //     name: "fp9",
            //     key: "tile_sheet",
            //     frame: 22,
            //     classType: FallingPlatform
            // }, 
            {
                name: "fp10",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp11",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            {
                name: "fp12",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp13",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            {
                name: "fp14",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp15",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            {
                name: "fp16",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp17",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            // {
            //     name: "fp18",
            //     key: "tile_sheet",
            //     frame: 4,
            //     classType: FallingPlatform
            // }, 
            // {
            //     name: "fp19",
            //     key: "tile_sheet",
            //     frame: 22,
            //     classType: FallingPlatform
            // }, 
            {
                name: "fp20",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp21",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            // {
            //     name: "fp22",
            //     key: "tile_sheet",
            //     frame: 4,
            //     classType: FallingPlatform
            // }, 
            // {
            //     name: "fp23",
            //     key: "tile_sheet",
            //     frame: 22,
            //     classType: FallingPlatform
            // }, 
            // {
            //     name: "fp28",
            //     key: "tile_sheet",
            //     frame: 4,
            //     classType: FallingPlatform
            // }, 
            // {
            //     name: "fp29",
            //     key: "tile_sheet",
            //     frame: 22,
            //     classType: FallingPlatform
            // }, 
            {
                name: "fp30",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp31",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            
        ]);
        // this.physics.world.enable(this.fallPlat1, Phaser.Physics.Arcade.STATIC_BODY);
        this.fallPlatGroup = this.add.group(this.fallPlat1);
        this.fallPlatGroup.runChildUpdate = true;
        this.physics.add.collider(this.player, this.fallPlatGroup, (obj1, obj2) => {
        });

        this.bigFallPlat = map.createFromObjects("Objects", [
            {
                name: "fp5",
                key: "tile_sheet",
                frame: 4,
                classType: BigFallingPlatform
            }, 
            {
                name: "fp6",
                key: "tile_sheet",
                frame: 10,
                classType: BigFallingPlatform
            }, 
            {
                name: "fp7",
                key: "tile_sheet",
                frame: 22,
                classType: BigFallingPlatform
            }, 
            // {
            //     name: "bfp1",
            //     key: "tile_sheet",
            //     frame: 4,
            //     classType: BigFallingPlatform
            // }, 
            // {
            //     name: "bfp2",
            //     key: "tile_sheet",
            //     frame: 10,
            //     classType: BigFallingPlatform
            // }, 
            // {
            //     name: "bfp3",
            //     key: "tile_sheet",
            //     frame: 22,
            //     classType: BigFallingPlatform
            // }, 
            {
                name: "bfp4",
                key: "tile_sheet",
                frame: 4,
                classType: BigFallingPlatform
            }, 
            {
                name: "bfp5",
                key: "tile_sheet",
                frame: 10,
                classType: BigFallingPlatform
            }, 
            {
                name: "bfp6",
                key: "tile_sheet",
                frame: 22,
                classType: BigFallingPlatform
            }, 
            // {
            //     name: "bfp7",
            //     key: "tile_sheet",
            //     frame: 4,
            //     classType: BigFallingPlatform
            // }, 
            // {
            //     name: "bfp8",
            //     key: "tile_sheet",
            //     frame: 10,
            //     classType: BigFallingPlatform
            // }, 
            // {
            //     name: "bfp9",
            //     key: "tile_sheet",
            //     frame: 22,
            //     classType: BigFallingPlatform
            // }, 
            {
                name: "bfp10",
                key: "tile_sheet",
                frame: 4,
                classType: BigFallingPlatform
            }, 
            {
                name: "bfp11",
                key: "tile_sheet",
                frame: 10,
                classType: BigFallingPlatform
            }, 
            {
                name: "bfp12",
                key: "tile_sheet",
                frame: 22,
                classType: BigFallingPlatform
            }, 
            {
                name: "bfp13",
                key: "tile_sheet",
                frame: 4,
                classType: BigFallingPlatform
            }, 
            {
                name: "bfp14",
                key: "tile_sheet",
                frame: 10,
                classType: BigFallingPlatform
            }, 
            {
                name: "bfp15",
                key: "tile_sheet",
                frame: 22,
                classType: BigFallingPlatform
            }, 
            {
                name: "test1",
                key: "tile_sheet",
                frame: 4,
                classType: BigFallingPlatform
            }, 
            {
                name: "test2",
                key: "tile_sheet",
                frame: 10,
                classType: BigFallingPlatform
            }, 
            {
                name: "test3",
                key: "tile_sheet",
                frame: 22,
                classType: BigFallingPlatform
            }, 
            
        ]);
        // this.physics.world.enable(this.fallPlat1, Phaser.Physics.Arcade.STATIC_BODY);
        this.bigFallPlatGroup = this.add.group(this.bigFallPlat);
        this.bigFallPlatGroup.runChildUpdate = true;
        this.physics.add.collider(this.player, this.bigFallPlatGroup, (obj1, obj2) => {
        });

        

        
        
        // SPIKES
        this.bSpikes = map.createFromObjects("Objects", {
            name: "b_spike",
            key: "tile_sheet",
            frame: 5 
        });
        this.physics.world.enable(this.bSpikes, Phaser.Physics.Arcade.STATIC_BODY);

        this.lSpikes = map.createFromObjects("Objects", {
            name: "l_spike",
            key: "tile_sheet",
            frame: 11 
        });
        this.physics.world.enable(this.lSpikes, Phaser.Physics.Arcade.STATIC_BODY);

        this.rSpikes = map.createFromObjects("Objects", {
            name: "r_spike",
            key: "tile_sheet",
            frame: 17 
        });
        this.physics.world.enable(this.rSpikes, Phaser.Physics.Arcade.STATIC_BODY);

        this.bSpikeGroup = this.add.group(this.bSpikes);
        this.physics.add.collider(this.player, this.bSpikeGroup, this.Death, null, this);

        this.lSpikeGroup = this.add.group(this.lSpikes);
        this.physics.add.collider(this.player, this.lSpikeGroup, this.Death, null, this);

        this.rSpikeGroup = this.add.group(this.rSpikes);
        this.physics.add.collider(this.player, this.rSpikeGroup, this.Death, null, this);


        // CHECKPOINT TO NEXT LEVEL
        this.checkPoint = map.createFromObjects("Objects", {
            name: "checkpoint",
            key: "transparent",
            frame: ""
        });

        this.physics.world.enable(this.checkPoint, Phaser.Physics.Arcade.STATIC_BODY);
        this.checkpointGroup = this.add.group(this.checkPoint);

        this.physics.add.overlap(this.player, this.checkpointGroup, this.goToLevel5, null, this);
        // this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
        // this.checkpoint1 = this.add.sprite(24832, 11008, 'rect', 0).setOrigin(0,0.5);
        // this.checkpoint.add(this.checkpoint1);
        // this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel5, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher);

         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);

        var style = { font: "20px Arial", fill: "#ffffff" };
        this.add.text(200,-200,'WASD to move', style);
        this.add.text(1000,-300,'SPACE to jump', style);
        this.add.text(11400,-2200,'W to climb', style);

        this.add.text(13800,-2400,'END', style);

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
        })

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
        // this.sky1.x = this.player.x/8;
        // this.back1.x = this.player.x/8;
        // this.mid1.x = this.player.x/8;
        // this.fore1.x = this.player.x/8;
        // this.sky1.y = this.player.y*0.5;

        console.log(this.player.x, this.player.y);
        // console.log('fallx', this.fallPlat1.x);
        // if (this.scene.physics.overlap(this.player, this.fallPlat1)) {
        //     console.log('fall');
        //     this.fallActivate();
        // }


    }

    goToLevel5(player, checkpoint) {
        this.scene.start('beforeLevel5Scene');
        this.scene.bringToTop('beforeLevel5Scene');
        this.scene.sleep('level1Scene');
        this.scene.sleep('level2Scene');
        this.scene.sleep('level3Scene');
        this.scene.sleep('level4Scene');
        this.scene.sleep('level5Scene');
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

    Respawn() {
        this.cameras.main.fadeIn(800);
        this.player.setPosition(this.respawnX, this.respawnY);
        this.player.alive = true;
        this.player.alpha = 1;
    }

    fallActivate(player, plat) {
        console.log('falll');
        // plat.body.allowGravity = true;
        plat.setVelocityY(100);
    }
}