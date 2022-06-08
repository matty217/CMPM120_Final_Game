class Level5 extends Phaser.Scene {
    constructor() {
        super("level5Scene");
    }
    PlayerController

    preload() {
        this.load.image('rect', './assets/white-square.png');
        this.load.image('platform', './assets/platform.png');
        this.load.image('platform_vert', './assets/platform_vert.png');
        this.load.image('spikes', './assets/spikes.png');
        this.load.image('boulder', './assets/Levels/Blocks/Tiles/1x1 Boulder.PNG');
        this.load.image('block_1', './assets/Levels/Blocks/1x1 Block.PNG');
        this.load.image('plat_1', './assets/Levels/Blocks/Platform Large.PNG');
        this.load.image('plat_2', './assets/Levels/Blocks/Platform Small.PNG');
        this.load.image('spikes_D', './assets/Levels/Blocks/Tiles/1x1 Spikes.PNG');
        
        this.load.image('lvl5back', './assets/Levels/Level-5/Background-5.PNG');
        this.load.image('lvl5mid', './assets/Levels/Level-5/Midground-5.PNG');
        this.load.image('lvl5fore', './assets/Levels/Level-5/Foreground-5.PNG');


        this.load.image('4x1', './assets/Levels/Blocks/4x1 Block_f.PNG');
        this.load.image('1x4', './assets/Levels/Blocks/4x1 Block_Rf.PNG');
        this.load.image('smoke', './assets/Cat/smoke.png');
        this.load.image('transparent', './assets/transparent.png');

        // TILE MAP
        this.load.image('terrain_tiles', 'assets/Levels/TileMaps/terrain_tiles.png');
        this.load.tilemapTiledJSON('platform_map5', 'assets/Levels/TileMaps/Level5.json');


        this.load.spritesheet('cat_walk', 'assets/Player/Walk_Sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.spritesheet('cat_jump', 'assets/Player/Jump_Sheet.PNG', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.spritesheet('cat_climb', 'assets/Player/Climb_Sheet.PNG', {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.spritesheet('cat_slide', 'assets/Player/Slide_Sheet.PNG', {
            frameWidth: 512,
            frameHeight: 512
        });

        this.load.audio('meow', 'assets/meow.wav');

        this.load.spritesheet("tile_sheet", "assets/Levels/TileMaps/terrain_tiles.png", {
            frameWidth: 512,
            frameHeight: 512
        });
        this.load.audio('birds_sfx', './assets/Sounds/Birds.mp3');
        this.load.audio('lvl5music', './assets/Sounds/Music/Level 5/Ketsa - Disappearing Memory.mp3');
    }

    create() {
        this.scene.launch('pauseScene');
        game.currentScene = 'level5Scene';

        this.game.sound.stopAll();
        // this.sound.play('birds');
        this.sfx = this.sound.add('birds_sfx');
        this.sfx.loop = true;
        this.sfx.play();

        this.music = this.sound.add('lvl5music', {volume: 0.2});
        this.music.loop = true;
        this.music.play();

        // BACKGROUND STUFF
        this.back0 = this.add.sprite(-5000, 5000, 'lvl5back', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.back1 = this.add.sprite(3200, 5000, 'lvl5back', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.back2 = this.add.sprite(11400, 5000, 'lvl5back', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.back3 = this.add.sprite(19610, 5000, 'lvl5back', 0).setScale(3).setScrollFactor(0.4, 0.4);

        this.mid0 = this.add.sprite(-5000, 5000, 'lvl5mid', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.mid1 = this.add.sprite(3200, 5000, 'lvl5mid', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.mid2 = this.add.sprite(11400, 5000, 'lvl5mid', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.mid3 = this.add.sprite(19610, 5000, 'lvl5mid', 0).setScale(3).setScrollFactor(0.4, 0.4);

        this.for0 = this.add.sprite(-5000, 5000, 'lvl5fore', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.for1 = this.add.sprite(3200, 5000, 'lvl5fore', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.for2 = this.add.sprite(11400, 5000, 'lvl5fore', 0).setScale(3).setScrollFactor(0.4, 0.4);
        this.for3 = this.add.sprite(19610, 5000, 'lvl5fore', 0).setScale(3).setScrollFactor(0.4, 0.4);

        this.cameras.main.fadeIn(1000);
        
        // create the Tilemap
	    const map = this.make.tilemap({ key: 'platform_map5' });

        // add the tileset image we are using
        const tileset = map.addTilesetImage('standard_tiles', 'terrain_tiles');
        
        // create the layers we want in the right order
        const backLayer = map.createLayer('Background', tileset);

        // "Ground" layer will be on top of "Background" layer
        const groundLayer = map.createLayer('Ground', tileset);

        this.physics.world.TILE_BIAS = 200;

        // (change static values to a variable later)
        this.cameras.main.setBounds(-15000, 1000);
        this.cameras.main.setZoom(0.2, 0.2);
        //this.physics.world.setBounds(0, 0, 20000, 10000);
        //this.physics.world.removeBounds(0, 0, 20000, 10000);

        this.cameras.main.setBackgroundColor('#435a49');

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        

            // set up player character
        this.player = new Cat(this, -14000, 13000, 'cat_walk', 0).setOrigin(0.5, 0.5).setScale(1)
        // .setSize(400, 300)
        // .setOffset(50, 150);
        this.respawnX = -14000;
        this.respawnY = 13000;
        //this.player.body.setMaxVelocity(600, 5000);
        
    
        // TILE MAP COLLIDER
        groundLayer.setCollisionByProperty({ 
            collides: true 
        });

        this.physics.add.collider(this.player, groundLayer);
        groundLayer.setCollisionBetween(0,23);

        // SPIKE GROUP
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

        this.uSpikes = map.createFromObjects("Objects", {
            name: "u_spike",
            key: "tile_sheet",
            frame: 23 
        });
        this.physics.world.enable(this.rSpikes, Phaser.Physics.Arcade.STATIC_BODY);

        this.bSpikeGroup = this.add.group(this.bSpikes);
        this.physics.add.collider(this.player, this.bSpikeGroup, this.Death, null, this);

        this.lSpikeGroup = this.add.group(this.lSpikes);
        this.physics.add.collider(this.player, this.lSpikeGroup, this.Death, null, this);

        this.rSpikeGroup = this.add.group(this.rSpikes);
        this.physics.add.collider(this.player, this.rSpikeGroup, this.Death, null, this);

        this.uSpikeGroup = this.add.group(this.uSpikes);
        this.physics.add.collider(this.player, this.uSpikeGroup, this.Death, null, this);


        // FALLING PLATFORM GROUP
        this.fallPlat = map.createFromObjects("Objects", [
            {
                name: "fp24",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp25",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
            {
                name: "fp26",
                key: "tile_sheet",
                frame: 4,
                classType: FallingPlatform
            }, 
            {
                name: "fp27",
                key: "tile_sheet",
                frame: 22,
                classType: FallingPlatform
            }, 
        ]);
        this.fallPlatGroup1 = this.add.group(this.fallPlat);
        this.fallPlatGroup1.runChildUpdate = true;
        this.physics.add.collider(this.player, this.fallPlatGroup1, (obj1, obj2) => {
        });

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

        // Boulder GROUP
        this.boulder = map.createFromObjects("Objects", {
            name: "boulder",
            key: "boulder",
            frame: ""
        });

        this.physics.world.enable(this.boulder, Phaser.Physics.Arcade.BODY);
        this.boulderGroup = this.add.group(this.boulder);

        this.physics.add.overlap(this.player, this.boulderGroup, (obj1, obj2) => {
            this.Death(obj1);
        })

        // Boulder Stop GROUP
        this.boulderStop = map.createFromObjects("Objects", {
            name: "boulderStop",
            key: "transparent",
            frame: ""
        });
    
        this.physics.world.enable(this.boulderStop, Phaser.Physics.Arcade.STATIC_BODY);
        this.boulderStopGroup = this.add.group(this.boulderStop);

        this.physics.add.overlap(this.boulderStopGroup, this.boulderGroup, (obj1, obj2) => {
            obj2.y -= Phaser.Math.Between(8000, 13000);
            obj2.body.velocity.y = 0;
            obj2.body.acceleration.y = -20000;
        })

        // CHECKPOINT TO NEXT LEVEL
        this.checkPoint = map.createFromObjects("Objects", {
            name: "checkpoint",
            key: "transparent",
            frame: ""
        });

        this.physics.world.enable(this.checkPoint, Phaser.Physics.Arcade.STATIC_BODY);
        this.checkpointGroup = this.add.group(this.checkPoint);

        this.physics.add.overlap(this.player, this.checkpointGroup, this.goToEndTransition, null, this);

        this.input.keyboard.on('keydown', sceneSwitcher);

         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);

        var style = { font: "90px Arial", fill: "#ffffff" };
        
        this.jumpParticles = this.add.particles('smoke');
            this.partEm2 = this.jumpParticles.createEmitter({
                radial: true,
                lifespan: { min: 800, max: 1500},
                speed: { min: 50, max: 600 },
                quantity: 0,
                gravityY: 2000,
                scale: { start: 4, end: 0, ease: 'Power3' },
                active: true,
                mode: 'ADD',
                
                follow: this.player
            });


    }

    update() {
        this.player.update();


        // BACKGROUND
        // this.back_0001.x = this.player.x/1.3;
        // this.back_0002.x = this.player.x/3;
        // this.back_0003.x = this.player.x/4;

        console.log(this.player.body.velocity.x);

        // Phaser.Actions.Call(this.boulderGroup.getChildren(), function(sprite) {
        //     this.children.y -= 100;

        // }, this);

        if (this.player.double_jumped) {
            this.partEm2.explode(40, this.player.x, this.player.y);
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
    goToEndTransition() {
        this.sfx.stop();
        this.music.stop();
        this.scene.start('endStoryBoardScene'); 
        this.scene.bringToTop('endStoryBoardScene');
        this.scene.sleep('level1Scene');
        this.scene.sleep('level2Scene');
        this.scene.sleep('level3Scene');
        this.scene.sleep('level4Scene');
        this.scene.sleep('level5Scene');
    }
    Respawn() {
        this.cameras.main.fadeIn(800);
        this.player.setPosition(this.respawnX, this.respawnY);
        this.player.alive = true;
        this.player.alpha = 1;
    }
}
