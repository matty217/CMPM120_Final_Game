class Level1 extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rect', './assets/white-square.png');

    }

    create() {
        this.player = this.add.sprite(game.config.width/2, game.config.height/2, 'rect', 0).setOrigin(0.5, 0.5).setScale(1);
    }

    update() {

    }

}