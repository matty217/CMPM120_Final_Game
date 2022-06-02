class BeforeLevel2 extends Phaser.Scene {
    constructor() {
      super("beforeLevel2Scene");

    }
    preload() {
        this.load.image('pg8', './assets/Storyboard/Page (8).jpg');
        this.load.image('pg9', './assets/Storyboard/Page (9).jpg');
        this.load.image('pg10', './assets/Storyboard/Page (10).jpg');
        

    }
    create() {
  
        this.scene.stop('level1Scene');

        
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
        this.add.text(game.config.width/2, 650, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pressCounter = 8;

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

          if (this.pressCounter == 12) {
            this.scene.start('level2Scene'); 
            this.scene.bringToTop('level2Scene');
            this.scene.pause('level1Scene');
            this.scene.pause('level3Scene');
            this.scene.pause('level4Scene');
            this.scene.pause('level5Scene');
          }
    }

    
}