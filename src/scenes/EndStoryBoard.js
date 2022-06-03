class EndStoryBoard extends Phaser.Scene {
    constructor() {
      super("endStoryBoardScene");

    }
    preload() {
        this.bg = {};

    }
    create() {
       
        
        this.bg.camera = this.cameras.add(0, 0, 1080, 720);
        this.bg.camera.setBackgroundColor('rgba(151,156,131, 0.5)');

        let menuConfig = {
            fontSize: '20px',
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
        this.add.text(game.config.width/2, game.config.height/2, 'You found home!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 650, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pressCounter = 1;

        

    }

    update() {
        // console.log('pressCounter', this.pressCounter);
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.nextImage();  
          }


    }

    nextImage() {
        // this.story = this.add.sprite(540, 320, 'pg'+[this.pressCounter]).setScale(0.3);
        this.pressCounter+=1;

          if (this.pressCounter == 2) {
            this.scene.start('gameOverScene'); 
            this.scene.bringToTop('gameOverScene');
            this.scene.sleep('level1Scene');
            this.scene.sleep('level2Scene');
            this.scene.sleep('level3Scene');
            this.scene.sleep('level4Scene');
            this.scene.sleep('level5Scene');
          }
    }

    
}