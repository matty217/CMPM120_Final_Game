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
        this.load.image('boulder', './assets/Levels/Blocks/Tiles/1x1 Boulder.PNG');
        this.load.image('block_1', './assets/Levels/Blocks/1x1 Block.PNG');
        this.load.image('plat_1', './assets/Levels/Blocks/Platform Large.PNG');
        this.load.image('plat_2', './assets/Levels/Blocks/Platform Small.PNG');
        this.load.image('spikes_D', './assets/Levels/Blocks/Tiles/1x1 Spikes.PNG');
        this.load.image('back_1', './assets/Levels/Level-1/Background-1.PNG');
        this.load.image('mid_1', './assets/Levels/Level-1/Midground-1.PNG');
        this.load.image('fore_1', './assets/Levels/Level-1/Foreground-1.PNG');
        this.load.image('brown_1', './assets/Levels/Level-1/back_brown.png');
        this.load.image('4x1', './assets/Levels/Blocks/4x1 Block_f.PNG');
        this.load.image('1x4', './assets/Levels/Blocks/4x1 Block_Rf.PNG');
        this.load.image('smoke', './assets/Cat/smoke.png');
        this.load.image('transparent', './assets/transparent.png');
        this.load.image('breaking', './assets/Levels/Blocks/Tiles/1x1 Break.PNG');
        this.load.image('red_part', './assets/Levels/Blocks/Tiles/red_part.png');

        // TILE MAP
        this.load.image('terrain_tiles', 'assets/Levels/TileMaps/terrain_tiles.png');
        this.load.tilemapTiledJSON('platform_map1', 'assets/Levels/TileMaps/Level1.json');


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
        this.load.spritesheet('heart', './assets/Levels/Blocks/Tiles/Heart sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });

        this.load.audio('meow', 'assets/meow.wav');

        this.load.audio('lvl1music', './assets/Sounds/Music/Level 1/Ketsa - Protective Spirits.mp3');
        this.load.audio('jump1', './assets/Sounds/SFX/Jump1.wav');
        this.load.audio('jump2', './assets/Sounds/SFX/Jump2.wav');
        this.load.audio('jump3', './assets/Sounds/SFX/Jump3.wav');
        this.load.audio('slide', './assets/Sounds/SFX/slide_sfx.wav');

    }

    create() {
        this.scene.launch('pauseScene');
        game.currentScene = 'level1Scene';

        this.game.sound.stopAll();
        this.lvl1music = this.sound.add('lvl1music', {volume: 0.1});
        this.lvl1music.loop = true;
        this.lvl1music.play();

        game.slideSound = game.sound.add('slide', {volume: 1});
        game.slideSound.loop = true;

        game.sfxJump1 = game.sound.add('jump1', {volume: 1});
        game.sfxJump2 = game.sound.add('jump2', {volume: 1});
        game.sfxJump3 = game.sound.add('jump3', {volume: 1});

        //ANIMATIONS
        const catWalk = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('cat_walk', {
                start: 0,
                end: 11
            }),
            frameRate: 16,
            repeat: -1
        });

        const catJump = this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('cat_jump', {
                start: 0,
                end: 5
            }),
            frameRate: 20,
            repeat: 0
        });

        const catClimb = this.anims.create({
            key: 'climb',
            frames: this.anims.generateFrameNames('cat_climb', {
                start: 0,
                end: 4
            }),
            frameRate: 16,
            repeat: -1
        });

        const catSlide = this.anims.create({
            key: 'slide',
            frames: this.anims.generateFrameNames('cat_slide', {
                start: 0,
                end: 0
            }),
            frameRate: 0,
            repeat: 0
        });

        const catIdle = this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('cat_walk', {
                start: 3,
                end: 3
            }),
            frameRate: 16,
            repeat: -1
        });

        const catFall = this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNames('cat_jump', {
                start: 5,
                end: 5
            }),
            frameRate: 16,
            repeat: -1
        });






        // BACKGROUND STUFF
        //this.background = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0x444444).setOrigin(0.5,0.5);
        this.back_0001 = this.add.sprite(-1000, 2500, 'back_1', 0).setScale(3).setScrollFactor(0.15,0.15);
        this.back_0002 = this.add.sprite(5800, 2500, 'back_1', 0).setScale(3).setScrollFactor(0.15,0.15);
        this.back_0003 = this.add.sprite(12600, 2500, 'back_1', 0).setScale(3).setScrollFactor(0.15,0.15);
        this.back_0004 = this.add.sprite(19400, 2500, 'back_1', 0).setScale(3).setScrollFactor(0.15,0.15);

        this.mid_0001 = this.add.sprite(-1000, 2500, 'mid_1', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.mid_0002 = this.add.sprite(5800, 2500, 'mid_1', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.mid_0003 = this.add.sprite(12600, 2500, 'mid_1', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.mid_0003 = this.add.sprite(19400, 2500, 'mid_1', 0).setScale(3).setScrollFactor(0.2,0.2);



        this.fore_0001 = this.add.sprite(-1000, 1500, 'fore_1', 0).setScale(3).setScrollFactor(0.25,0.25);
        this.fore_0002 = this.add.sprite(5800, 2500, 'fore_1', 0).setScale(3).setScrollFactor(0.25,0.25);
        this.fore_0003 = this.add.sprite(12600, 2500, 'fore_1', 0).setScale(3).setScrollFactor(0.25,0.25);
        this.fore_0004 = this.add.sprite(this.fore_0003.x+6800, 2500, 'fore_1', 0).setScale(3).setScrollFactor(0.25,0.25);
        this.fore_0005 = this.add.sprite(this.fore_0004.x+6800, 2500, 'fore_1', 0).setScale(3).setScrollFactor(0.25,0.25);
        this.fore_0006 = this.add.sprite(this.fore_0005.x+6800, 2500, 'fore_1', 0).setScale(3).setScrollFactor(0.25,0.25);



        // this.back_brown = this.add.sprite(-1000, 8500, 'brown_1', 0).setScale(3).setScrollFactor(0.4, 0.4);
        // this.back_brown = this.add.sprite(5800, 8500, 'brown_1', 0).setScale(3).setScrollFactor(0.4, 0.4);
        // this.back_brown = this.add.sprite(12600, 8500, 'brown_1', 0).setScale(3).setScrollFactor(0.4, 0.4);
        // this.back_brown = this.add.sprite(19400, 8500, 'brown_1', 0).setScale(3).setScrollFactor(0.4, 0.4);



        
        // create the Tilemap
	    const map = this.make.tilemap({ key: 'platform_map1' });

        // add the tileset image we are using
        const tileset = map.addTilesetImage('standard_tiles', 'terrain_tiles');
        
        // create the layers we want in the right order
        const backLayer = map.createLayer('Background', tileset);

        // "Ground" layer will be on top of "Background" layer
        const groundLayer = map.createLayer('Ground', tileset);

        this.physics.world.TILE_BIAS = 200;

        // (change static values to a variable later)
        this.cameras.main.setBounds(-8000, -18000);
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
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        

            // set up player character
        this.player = new Cat(this, -5000.00, 10000.00, 'cat_walk', 0).setOrigin(0.5, 0.5).setScale(1)
        .setSize(400, 300)
        .setOffset(50, 150);
        this.respawnX = -4000;
        this.respawnY = 13000;
        //this.player.body.setMaxVelocity(600, 5000);
        
    
        //fgdg
        // TILE MAP COLLIDER
        groundLayer.setCollisionByProperty({
            collides: true
        });

        this.physics.add.collider(this.player, groundLayer);
        groundLayer.setCollisionBetween(0,23);

        // SPIKE GROUP
        this.spikes = map.createFromObjects("Objects", {
            name: "Spike",
            key: "spikes_D",
            frame: "0"
        });

        this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
        this.spikeGroup = this.add.group(this.spikes);

        this.physics.add.overlap(this.player, this.spikeGroup, (obj1, obj2) => {
            this.Death(obj1, obj2);
        })

        // RESPAWN POINT GROUP
        this.respawnPoint = map.createFromObjects("Objects", {
            name: "Respawn",
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
            name: "Death",
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
            name: "Boulder",
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
            name: "BoulderStop",
            key: "transparent",
            frame: ""
        });
    
        this.physics.world.enable(this.boulderStop, Phaser.Physics.Arcade.STATIC_BODY);
        this.boulderStopGroup = this.add.group(this.boulderStop);

        this.physics.add.overlap(this.boulderStopGroup, this.boulderGroup, (obj1, obj2) => {
            obj2.y -= 10000;
            obj2.body.velocity.y = 0;
            obj2.body.acceleration.y = -20000;
        })

        // Boulder Stop High GROUP
        this.boulderStopHigh = map.createFromObjects("Objects", {
            name: "BoulderStopHigh",
            key: "transparent",
            frame: ""
        });
    
        this.physics.world.enable(this.boulderStopHigh, Phaser.Physics.Arcade.STATIC_BODY);
        this.boulderStopHighGroup = this.add.group(this.boulderStopHigh);

        this.physics.add.overlap(this.boulderStopHighGroup, this.boulderGroup, (obj1, obj2) => {
            obj2.y -= 30000;
            obj2.body.velocity.y = 0;
            obj2.body.acceleration.y = -20000;
        })

        // Breaking Ground Group
        this.breakingGround = map.createFromObjects("Objects", {
            name: "Breaking_Ground",
            key: "breaking",
            frame: ""
        });
    
        this.physics.world.enable(this.breakingGround, Phaser.Physics.Arcade.STATIC_BODY);
        this.breakingGroundGroup = this.add.group(this.breakingGround);
        this.physics.add.collider(this.player, this.breakingGroundGroup);

        this.physics.add.overlap(this.player, this.breakingGroundGroup, (obj1, obj2) => {
            if (this.ended == true) {
            }
        })

        // Level End Group
        this.levelEnd = map.createFromObjects("Objects", {
            name: "Level_End",
            key: "heart",
            frame: "4"
        });
    
        this.physics.world.enable(this.levelEnd, Phaser.Physics.Arcade.STATIC_BODY);
        this.levelEndGroup = this.add.group(this.levelEnd);

        this.physics.add.overlap(this.player, this.levelEndGroup, (obj1, obj2) => {
            this.scene.stop('pauseScene');

            this.partEmHeart.explode(30);
            this.breakingGroundGroup.clear(true);
        })

        // Hidden Coin GROUP
        this.goodBoyCoin = map.createFromObjects("Objects", {
            name: "GoodBoyCoin",
            key: "lava",
            frame: ""
        });
    
        this.physics.world.enable(this.goodBoyCoin, Phaser.Physics.Arcade.STATIC_BODY);
        this.goodBoyCoinGroup = this.add.group(this.goodBoyCoin);

        this.physics.add.overlap(this.player, this.goodBoyCoinGroup, (obj1, obj2) => {
            game.goodBoyCoins += 1;
        })

        // End Group
        this.End = map.createFromObjects("Objects", {
            name: "End",
            key: "transparent",
            frame: ""
        });
    
        this.physics.world.enable(this.End, Phaser.Physics.Arcade.STATIC_BODY);
        this.EndGroup = this.add.group(this.End);

        this.physics.add.overlap(this.player, this.EndGroup, (obj1, obj2) => {
            this.scene.stop('pauseScene');
            this.goToLevel2();
        })


        this.input.keyboard.on('keydown', sceneSwitcher);

         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);

        var style = { font: "90px Arial", fill: "#ffffff" };
        this.add.text(200,-200,'WASD to move', style);
        this.add.text(1000,-300,'SPACE to jump', style);
        this.add.text(40880,3500,'W to climb', style); 

        this.add.text(13800,-2400,'END', style);

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
            x: 136392.00,
            y: 8016.00
        });


    }

    update() {
        this.player.update();


        // BACKGROUND
        // this.back_0001.x = this.player.x/1.3;
        // this.back_0002.x = this.player.x/3;
        // this.back_0003.x = this.player.x/4;

        console.log(this.player.body.velocity.x);

        Phaser.Actions.Call(this.boulderGroup.getChildren(), function(sprite) {
            this.children.y -= 100;

        }, this);

        if (this.player.double_jumped) {
            this.partEm2.explode(40, this.player.x, this.player.y);
        }

    }

    goToLevel2(player, checkpoint) {
        this.lvl1music.stop();
        game.scene.start('beforeLevel2Scene');
        game.scene.bringToTop('beforeLevel2Scene');
        game.scene.sleep('level1Scene');
        game.scene.sleep('level3Scene');
        game.scene.sleep('level4Scene');
        game.scene.sleep('level5Scene');
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
}
