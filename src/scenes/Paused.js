class Paused extends Phaser.Scene {
    constructor() {
      super("pauseScene");
    }
    create() {
        // hiding mouse
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        // menu text configuration
        let menuConfig = {
            fontFamily: 'INVASION2000',
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
        
        // this menu text is temporary for now
        menuConfig.fontSize = '50px';
        this.pausedText = this.add.text(game.config.width/2, 180, 'PAUSED', menuConfig).setOrigin(0.5);
        this.pausedText.alpha = 0;
        

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        this.pausedText.setDepth(0.5);
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            if (game.paused == false) {
                game.paused = true;
                this.pausedText.alpha = 0.9;
                this.scene.pause(game.currentScene);
            } else {
                game.paused = false;
                this.pausedText.alpha = 0;
                this.scene.resume(game.currentScene);
            }
        }
    }
}