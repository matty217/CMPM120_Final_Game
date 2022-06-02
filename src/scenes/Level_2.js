class Level2 extends Phaser.Scene {
    constructor() {
        super("level2Scene");
    }
    PlayerController

    preload() {
        this.load.image('rect', './assets/white-square.png');
        this.load.image('back_2', './assets/Levels/Level-2/Background-2.PNG');
        this.load.image('mid_2', './assets/Levels/Level-2/Midground-2.PNG');
        this.load.image('fore_2', './assets/Levels/Level-2/Foreground-2.PNG');
        this.load.image('fire', './assets/Levels/Blocks/Tiles/fire.png');
        this.load.image('lava', './assets/Levels/Blocks/Tiles/lava.png');


        // TILE MAP
        this.load.image('terrain_tiles', 'assets/Levels/TileMaps/terrain_tiles.png');
        this.load.tilemapTiledJSON('platform_map2', 'assets/Levels/TileMaps/Level2.json');

        this.load.spritesheet('geyser', 'assets/Levels/Blocks/Tiles/Geyser_Sheet.png', {
            frameWidth: 512,
            frameHeight: 512
        });

        this.load.spritesheet('blue_geyser', 'assets/Levels/Blocks/Tiles/Geyser_Sheet_Blue.png', {
            frameWidth: 512,
            frameHeight: 512
        });

    }

    create() {
        const geyserAnimate = this.anims.create({
            key: 'geyser',
            frames: this.anims.generateFrameNames('geyser', {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        // camera and world bounds
        // (change static values to a variable later)
        this.cameras.main.setBounds(0, 0, 2000 , 720);
        this.physics.world.setBounds(0, 0,2000, 720);

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
        this.back_0001 = this.add.sprite(-1000, 2500, 'back_2', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back_0002 = this.add.sprite(5800, 2500, 'back_2', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back_0003 = this.add.sprite(12600, 2500, 'back_2', 0).setScale(3).setScrollFactor(0.2,0.2);
        this.back_0004 = this.add.sprite(19400, 2500, 'back_2', 0).setScale(3).setScrollFactor(0.2,0.2);

        this.mid_0001 = this.add.sprite(-1000, 2500, 'mid_2', 0).setScale(2.5).setScrollFactor(0.3,0.3);
        this.mid_0002 = this.add.sprite(5800, 2500, 'mid_2', 0).setScale(2.5).setScrollFactor(0.3,0.3);
        this.mid_0003 = this.add.sprite(12600, 2500, 'mid_2', 0).setScale(2.5).setScrollFactor(0.3,0.3);
        this.mid_0003 = this.add.sprite(19400, 2500, 'mid_2', 0).setScale(2.5).setScrollFactor(0.3,0.3);



        this.fore_0001 = this.add.sprite(-1000, 3500, 'fore_2', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore_0002 = this.add.sprite(5800, 3500, 'fore_2', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore_0002 = this.add.sprite(12600, 3500, 'fore_2', 0).setScale(2.5).setScrollFactor(0.4,0.4);
        this.fore_0002 = this.add.sprite(19400, 3500, 'fore_2', 0).setScale(2.5).setScrollFactor(0.4,0.4);



        // this.back_brown = this.add.sprite(-1000, 8500, 'back_4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        // this.back_brown = this.add.sprite(5800, 8500, 'back_4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        // this.back_brown = this.add.sprite(12600, 8500, 'back_4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);
        // this.back_brown = this.add.sprite(19400, 8500, 'back_4', 0).setScale(2.5).setScrollFactor(0.4, 0.4);



        
        // create the Tilemap
	    const map = this.make.tilemap({ key: 'platform_map2' });

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
        

            // set up PLAYER -----------------
        this.player = new Cat(this, -5000, 5000, 'cat_walk', 0).setOrigin(0.5, 0.5).setScale(1);
        this.respawnX = -6725.70;
        this.respawnY = 10630.20;
        //this.player.body.setMaxVelocity(600, 5000);
        
        // geyser
        this.geyser = new Geyser(this, -5000, 12000, 'transparent').setOrigin(0.5, 0.5).setScale(1);
    
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

        // GEYSER GROUP
        this.geyser = map.createFromObjects("Objects", {
            name: "Geyser",
            key: "blue_geyser",
            frame: ""
        });
    
        this.physics.world.enable(this.geyser, Phaser.Physics.Arcade.STATIC_BODY);
        this.geyserGroup = this.add.group(this.geyser);

        this.physics.add.overlap(this.player, this.geyserGroup, (obj1, obj2) => {
            obj1.body.velocity.y = -15000;
        })

        // FIRE GROUP
        this.fire = map.createFromObjects("Objects", {
            name: "Fire",
            key: "transparent",
            frame: ""
        });
    
        this.physics.world.enable(this.fire, Phaser.Physics.Arcade.STATIC_BODY);
        this.fireGroup = this.add.group(this.fire);

        this.physics.add.overlap(this.player, this.fireGroup, (obj1, obj2) => {
            if (this.fireOn) {
                this.Death(obj1);
            }
        })

        // Lava GROUP
        this.lava = map.createFromObjects("Objects", {
            name: "Lava",
            key: "lava",
            frame: ""
        });
    
        this.physics.world.enable(this.lava, Phaser.Physics.Arcade.STATIC_BODY);
        this.lavaGroup = this.add.group(this.lava);

        this.physics.add.overlap(this.player, this.lavaGroup, (obj1, obj2) => {
            this.Death(obj1);
        })

        // GEYSERS
        
        // // Geyser Group
        // this.geyserGroup2 = this.physics.add.group( {allowGravity: false, immovable: true } );
        // this.physics.add.collider(this.player, this.geyserGroup2);

        // // Geyser 1
        // this.geyser1 = this.add.sprite(-3000, 13136, 'geyser', 0).setOrigin(0, 0);
        // let t = this.tweens.add({
        //     targets: this.geyser1,
        //     y: 400,
        //     duration: 3000,
        //     ease: 'Linear',
        //     yoyo: true,
        //     repeat: 2000
        // });
        // t.restart();
        // this.geyserBase1 = this.add.sprite(800, 600, 'platform_vert', 0).setOrigin(0, 0);

        // // Geyser 2
        // this.geyser2 = this.add.sprite(1200, 500, 'platform_vert', 0).setOrigin(0, 0);
        // let t2 = this.tweens.add({
        //     targets: this.geyser2,
        //     y: 400,
        //     duration: 2500,
        //     ease: 'Linear',
        //     yoyo: true,
        //     repeat: 2000
        // });
        // t2.restart();
        // this.geyserBase2 = this.add.sprite(1200, 600, 'platform_vert', 0).setOrigin(0, 0);

        // // Add Geysers to group
        // this.geyserGroup2.add(this.geyser1);
        // this.geyserGroup2.add(this.geyserBase1);
        // this.geyserGroup2.add(this.geyser2);
        // this.geyserGroup2.add(this.geyserBase2);
        
         // CHECKPOINT TO NEXT LEVEL
         this.checkpoint = this.physics.add.group({allowGravity: false, immovable: true });
         this.checkpoint1 = this.add.sprite(136352.00, 9368.00, 'rect', 0).setOrigin(0,0.5);
         this.checkpoint.add(this.checkpoint1);
         this.physics.add.overlap(this.player, this.checkpoint, this.goToLevel3, null, this);
 


        this.input.keyboard.on('keydown', sceneSwitcher);

         // follow player with camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, 100);

        var style = { font: "90px Arial", fill: "#ffffff" };
        this.add.text(200,-200,'WASD to move', style);

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


        // FIRE PARTICLE EMITTERS
        // shoots up
        this.fireParticles = this.add.particles('fire');
        this.fireEm = this.fireParticles.createEmitter({
            radial: true,
            x: -3592.00,
            y: 14368.00,
            lifespan: { min: 1000, max: 1500},
            speed: { min: 1500, max: 3000 },
            quantity: 2,
            gravityY: -1000,
            scale: { start: 1.5, end: 0, ease: 'Power2' },
            active: true,
            mode: 'ADD',
            angle: {min:-80, max: -100}
        });
        this.fireEm.active = false;

        // shoots right
        this.fireEm2 = this.fireParticles.createEmitter({
            radial: true,
            x: 30000,
            y: 9894,
            lifespan: { min: 1000, max: 1500},
            speed: { min: 1500, max: 3000 },
            quantity: 2,
            gravityY: -1000,
            scale: { start: 1.5, end: 0, ease: 'Power2' },
            active: true,
            mode: 'ADD',
            angle: {min:10, max: -10}
        });

        // shoots left
        this.fireEm3 = this.fireParticles.createEmitter({
            radial: true,
            x: 34956.00,
            y: 10020.00,
            lifespan: { min: 1000, max: 1500},
            speed: { min: 1500, max: 3000 },
            quantity: 2,
            gravityY: -1000,
            scale: { start: 1.5, end: 0, ease: 'Power2' },
            active: true,
            mode: 'ADD',
            angle: {min:-170, max: -190}
        });

        // shoots up
        this.fireEm4 = this.fireParticles.createEmitter({
            radial: true,
            x: 31820.00,
            y: 13912.00,
            lifespan: { min: 1000, max: 1500},
            speed: { min: 1500, max: 3000 },
            quantity: 2,
            gravityY: -1000,
            scale: { start: 1.5, end: 0, ease: 'Power2' },
            active: true,
            mode: 'ADD',
            angle: {min:-80, max: -100}
        });

        // shoots up
        this.fireEm5 = this.fireParticles.createEmitter({
            radial: true,
            x: 33250.00,
            y: 16984.00,
            lifespan: { min: 1000, max: 1500},
            speed: { min: 1500, max: 3000 },
            quantity: 2,
            gravityY: -1000,
            scale: { start: 1.5, end: 0, ease: 'Power2' },
            active: true,
            mode: 'ADD',
            angle: {min:-80, max: -100}
        });

        // shoots up
        this.fireEm6 = this.fireParticles.createEmitter({
            radial: true,
            x: 34314.00,
            y: 16984.00,
            lifespan: { min: 1000, max: 1500},
            speed: { min: 1500, max: 3000 },
            quantity: 2,
            gravityY: -1000,
            scale: { start: 1.5, end: 0, ease: 'Power2' },
            active: true,
            mode: 'ADD',
            angle: {min:-80, max: -100}
        });




        this.cameras.main.fadeOut(1);
        this.cameras.main.fadeIn(3000);


    }

    update() {
        this.player.update();

        if (!this.looping) {
            this.looping = true;
            if (!this.fireOn) {
                let fireOn = this.time.addEvent({ delay: 3000, callback: () =>{
                    this.fireOn = true;
                    let fireOff = this.time.addEvent({ delay: 2000, callback: () =>{
                        this.fireOn = false;
                        this.looping = false;
                    }});
                }});
            }
        }

        if (this.fireOn) {
            this.fireEm.on = true;
            this.fireEm2.on = true;
            this.fireEm3.on = true;
            this.fireEm4.on = true;
            this.fireEm5.on = true;
            this.fireEm6.on = true;
        } else {
            this.fireEm.on = false;
            this.fireEm2.on = false;
            this.fireEm3.on = false;
            this.fireEm4.on = false;
            this.fireEm5.on = false;
            this.fireEm6.on = false;
        }
        
        


        //this.fireEm.active = this.geyser.partOn;
        


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
        game.scene.start('level2Scene');
        game.scene.bringToTop('level2Scene');
        game.scene.pause('level1Scene');
        game.scene.pause('level3Scene');
        game.scene.pause('level4Scene');
        game.scene.pause('level5Scene');
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
