class EndStoryBoard extends Phaser.Scene {
    constructor() {
      super("endStoryBoardScene");

    }
    preload() {


    }
    create() {
       
        
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
        this.add.text(game.config.width/2, game.config.height/2, 'You found home!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 650, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.pressCounter = 14;

        

    }

    update() {
        // console.log('pressCounter', this.pressCounter);
        // if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        //     this.nextImage();  
        //   }


    }

    nextImage() {
        // this.story = this.add.sprite(540, 320, 'pg'+[this.pressCounter]).setScale(0.3);
        // this.pressCounter+=1;

        //   if (this.pressCounter == 20) {
        //     this.scene.start('level4Scene'); 
        //     this.scene.bringToTop('level4Scene');
        //     this.scene.pause('level1Scene');
        //     this.scene.pause('level2Scene');
        //     this.scene.pause('level3Scene');
        //     this.scene.pause('charonScene');
        //     this.scene.pause('level5Scene');
        //   }
    }

    
}