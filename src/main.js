// ARTG/CMPM 120 Endless Runner Game by Matty Hill, Micah Mahelona, Mrinmoyee Mishra


let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3000 },
            debug: false
        }
    },
    scene: [ ]
}


let game = new Phaser.Game(config);
game.settings = {
    worldSpeed: 8
};

// reserving keyboard variables
let keyW, keyA, keyS, keyD, keySPACE, keyRIGHT, keyLEFT, keyESC;

game.paused = false;


