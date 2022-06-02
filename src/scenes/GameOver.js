class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");

    }

    create() {
      let gameOverConfig = {
        fontSize: '30px',
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
    
    this.add.text(game.config.width/2, 180, 'Thank you for playing!', gameOverConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, 300, 'To restart the game, please press <- ', gameOverConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, 500, 'Credits:', gameOverConfig).setOrigin(0.5);
    gameOverConfig.align = 'left';
    this.add.text(game.config.width/2, 570, ' Micah Mahelona:   Artist and Audio Designer\n Matthew Hill:     Programmer and Level Designer\n Mrinmoyee Mishra: Programmer and Level Designer', gameOverConfig).setOrigin(0.5);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start('menuScene');
      }
    }
}