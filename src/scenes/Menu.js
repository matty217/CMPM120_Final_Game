class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");

    }
    preload() {
        this.load.image('pg1', './assets/Storyboard/Page (1).jpg');
        this.load.image('pg2', './assets/Storyboard/Page (2).jpg');
        this.load.image('pg3', './assets/Storyboard/Page (3).jpg');
        this.load.image('pg4', './assets/Storyboard/Page (4).jpg');
        this.load.image('pg5', './assets/Storyboard/Page (5).jpg');
        this.load.image('pg6', './assets/Storyboard/Page (6).jpg');
        this.load.image('pg7', './assets/Storyboard/Page (7).jpg');
        this.load.image('pg8', './assets/Storyboard/Page (8).jpg');
        this.load.image('pg9', './assets/Storyboard/Page (9).jpg');
        this.load.image('pg10', './assets/Storyboard/Page (10).jpg');


        this.load.image('titleimg', './assets/Levels/Title Screen/Title Screen Background.PNG');
        this.bg = {};
        this.load.audio('storymusic', './assets/Sounds/Music/Level 1/Ketsa - Protective Spirits.mp3');
    }
    create() {
      this.game.sound.stopAll();
      this.storyMusic = this.sound.add('storymusic', {volume: 0.5});
      this.storyMusic.loop = true;
      this.storyMusic.play();
      
        this.bg.camera = this.cameras.add(0, 0, 1080, 720);
        this.bg.camera.setBackgroundColor('rgba(151,156,131, 0.5)');
        this.titleImg = this.add.sprite(100, 445, 'titleimg').setScale(0.27);
        // menu text configuration
        let menuConfig = {
            fontSize: '70px',
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
        
        this.add.text(game.config.width/2, 160, 'Gone But Not Forgotten', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '40px';
        this.add.text(game.config.width/2, 240, 'Game Instructions:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 300, 'A: Move Left', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 350, 'D: Move Right', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 400, 'Space: Jump/Double Jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 450, 'W+Space: Wall Climb', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 685, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pressedCounter = 1;

        // this.input.keyboard.on('keydown', sceneSwitcher);

    }

    update() {
        console.log('update pressed counter', this.pressedCounter);
        if (this.pressedCounter == 2) {
          this.titleImg.destroy();
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // this.scene.start('level1Scene'); 
            this.nextImage();  
           
          }
          console.log('update 2 pressed counter', this.pressedCounter);
        //   if (this.pressedCounter == 4) {
        //     this.scene.start('level1Scene'); 
        //   }

    }

    nextImage() {
        console.log('pressed counter', this.pressedCounter);
        this.story = this.add.sprite(540, 340, 'pg'+[this.pressedCounter]).setScale(0.3);
        this.pressedCounter+=1;

          if (this.pressedCounter == 12) {
            this.storyMusic.stop();
            this.scene.start('level1Scene'); 
          }
    }

    
}