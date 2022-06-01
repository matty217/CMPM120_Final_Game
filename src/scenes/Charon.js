class Charon extends Phaser.Scene {
    constructor() {
      super("charonScene");

    }
    preload() {
        this.load.image('pg14', './assets/Storyboard/Page (14).jpg');
        this.load.image('pg15', './assets/Storyboard/Page (15).jpg');
        this.load.image('pg16', './assets/Storyboard/Page (16).jpg');
        this.load.image('pg17', './assets/Storyboard/Page (17).jpg');
        this.load.image('pg18', './assets/Storyboard/Page (18).jpg');
        this.load.image('black', './assets/Levels/Blocks/Tiles/Solid Block.PNG');

    }
    create() {
        this.black = this.add.sprite(540, 320, 'black').setScale(5);
  
        this.scene.stop('level3Scene');

        
        // menu text configuration
        let menuConfig = {
            fontSize: '20px',
            backgroundColor: '#637a68',
            color: '#dddace',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5
            },
        }
        this.add.text(game.config.width/2, 360, 'You have collected all the coins.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 400, 'Charon has agreed to take you accross River Styx.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 650, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pressCounter = 14;

        // this.input.keyboard.on('keydown', sceneSwitcher);

    }

    update() {
        console.log('pressCounter', this.pressCounter);
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.nextImage();  
          }


    }

    nextImage() {
        this.story = this.add.sprite(540, 320, 'pg'+[this.pressCounter]).setScale(0.3);
        this.pressCounter+=1;

          if (this.pressCounter == 20) {
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