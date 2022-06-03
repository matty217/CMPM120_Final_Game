class BeforeLevel5 extends Phaser.Scene {
    constructor() {
      super("beforeLevel5Scene");

    }
    preload() {
        this.load.image('pg19', './assets/Storyboard/Page (19).jpg');
        this.load.image('pg20', './assets/Storyboard/Page (20).jpg');
        this.bg = {};

    }
    create() {
  
        this.scene.stop('level4Scene');

        
        this.bg.camera = this.cameras.add(0, 0, 1080, 720);
        this.bg.camera.setBackgroundColor('rgba(151,156,131, 0.5)');

        let menuConfig = {
            fontSize: '40px',
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
        this.add.text(game.config.width/2, game.config.height/2, 'You have left the graveyard and found the gates to your home!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 680, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pressCounter = 19;

        // this.input.keyboard.on('keydown', sceneSwitcher);

    }

    update() {
        console.log('pressCounter', this.pressCounter);
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.nextImage();  
          }


    }

    nextImage() {
        this.story = this.add.sprite(540, 340, 'pg'+[this.pressCounter]).setScale(0.3);
        this.pressCounter+=1;

          if (this.pressCounter == 22) {
            this.scene.start('level5Scene'); 
            this.scene.bringToTop('level5Scene');
            this.scene.pause('level1Scene');
            this.scene.pause('level2Scene');
            this.scene.pause('level3Scene');
            this.scene.pause('level4Scene');
          }
    }

    
}