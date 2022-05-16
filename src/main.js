// ARTG/CMPM 120 Endless Runner Game by Matty Hill, Micah Mahelona, Mrinmoyee Mishra


let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 5000 },
            debug: true
        }
    },
    scene: [ Level1, Level2, Level3, Level4, Level5 ]
}


let game = new Phaser.Game(config);
game.settings = {
    worldSpeed: 8
};

// reserving keyboard variables
let keyW, keyA, keyS, keyD, keySPACE, keyLEFT;

let sceneSwitcher = (event) => {
    //console.log("Key is: " + event.key);
    switch(event.key) {
        case '1':
            game.scene.start('level1Scene');
            game.scene.bringToTop('level1Scene');
            game.scene.pause('level2Scene');
            game.scene.pause('level3Scene');
            game.scene.pause('level4Scene');
            game.scene.pause('level5Scene');
            
            break;

        case '2':
            game.scene.start('level2Scene');
            game.scene.bringToTop('level2Scene');
            game.scene.pause('level1Scene');
            game.scene.pause('level3Scene');
            game.scene.pause('level4Scene');
            game.scene.pause('level5Scene');

            break;
        case '3':
            game.scene.start('level3Scene');
            game.scene.bringToTop('level3Scene');
            game.scene.pause('level1Scene');
            game.scene.pause('level2Scene');
            game.scene.pause('level4Scene');
            game.scene.pause('level5Scene');

            break;

        case '4':
            game.scene.start('level4Scene');
            game.scene.bringToTop('level4Scene');
            game.scene.pause('level1Scene');
            game.scene.pause('level2Scene');
            game.scene.pause('level3Scene');
            game.scene.pause('level5Scene');

            break;

        case '5':
            game.scene.start('level5Scene');
            game.scene.bringToTop('level5Scene');
            game.scene.pause('level1Scene');
            game.scene.pause('level2Scene');
            game.scene.pause('level3Scene');
            game.scene.pause('level4Scene');

            break;
        default:
                break;
    }
}