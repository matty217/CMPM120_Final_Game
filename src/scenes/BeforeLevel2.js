class BeforeLevel2 extends Phaser.Scene {
    constructor() {
      super("beforeLevel2Scene");

    }
    preload() {
        this.load.image('pg11', './assets/Storyboard/Page (11).jpg');
        this.load.image('pg12', './assets/Storyboard/Page (12).jpg');
        this.load.image('pg13', './assets/Storyboard/Page (13).jpg');
        this.bg = {};

    }
    create() {
  
        this.scene.stop('level1Scene');

        
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
        this.add.text(game.config.width/2, game.config.height/2, 'You escaped the Grim Reaper!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 680, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pressCounter = 11;

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

          if (this.pressCounter == 15) {
            this.scene.start('level2Scene'); 
            this.scene.bringToTop('level2Scene');
            this.scene.sleep('level1Scene');
            this.scene.sleep('beforeLevel2Scene');
            this.scene.sleep('level3Scene');
            this.scene.sleep('level4Scene');
            this.scene.sleep('level5Scene');
          }
    }

    
}