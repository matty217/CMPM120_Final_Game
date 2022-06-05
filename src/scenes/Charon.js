class Charon extends Phaser.Scene {
    constructor() {
      super("charonScene");

    }
    preload() {
        this.load.image('pg17', './assets/Storyboard/Page (17).jpg');
        this.load.image('pg18', './assets/Storyboard/Page (18).jpg');
        this.load.image('pg19', './assets/Storyboard/Page (19).jpg');
        this.load.image('pg20', './assets/Storyboard/Page (20).jpg');
        this.load.image('pg21', './assets/Storyboard/Page (21).jpg');
        this.load.image('pg22', './assets/Storyboard/Page (22).JPG');
        this.load.image('pg23', './assets/Storyboard/Page (23).JPG');
        this.load.image('pg24', './assets/Storyboard/Page (24).JPG');
        this.load.image('pg25', './assets/Storyboard/Page (25).JPG');
        this.load.image('black', './assets/Levels/Blocks/Tiles/Solid Block.PNG');
        this.bg = {};

    }
    create() {
        
  
        this.scene.stop('level3Scene');

        
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
        this.add.text(game.config.width/2, game.config.height/2, 'Charon has accepted your payment of 3 memories. \n\n He has granted you access to cross the River of Styx.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 680, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.charonPressCounter = 17;

        // this.input.keyboard.on('keydown', sceneSwitcher);

    }

    update() {
        console.log('pressCounter', this.charonPressCounter);
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.nextImage();  
          }


    }

    nextImage() {
        this.story = this.add.sprite(540, 340, 'pg'+[this.charonPressCounter]).setScale(0.3);
        this.charonPressCounter+=1;

          if (this.charonPressCounter == 27) {
            this.scene.start('level4Scene'); 
            this.scene.bringToTop('level4Scene');
            this.scene.pause('level1Scene');
            this.scene.pause('level2Scene');
            this.scene.pause('level3Scene');
            this.scene.pause('charonScene');
            this.scene.pause('level5Scene');
          }
    }

    
}