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
        
        this.add.text(game.config.width/2, 180, 'menu', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 650, 'Press Space to Continue', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pressedCounter = 1;

    }

    update() {
        console.log('update pressed counter', this.pressedCounter);
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
        this.story = this.add.sprite(540, 320, 'pg'+[this.pressedCounter]).setScale(0.3);
        this.pressedCounter+=1;

          if (this.pressedCounter == 12) {
            this.scene.start('level1Scene'); 
          }
    }

    
}