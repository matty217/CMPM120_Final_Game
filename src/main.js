// ARTG/CMPM 120 Endless Runner Game by Matty Hill, Micah Mahelona, Mrinmoyee Mishra


let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 25000 },
            debug: false
        }
    },
    scene: [ Menu, Level1, BeforeLevel2, Level2, Level3, Charon, Level4, BeforeLevel5, Level5, EndStoryBoard, TakeCare, GameOver, Paused]
}


let game = new Phaser.Game(config);
game.settings = {
    worldSpeed: 8
};
game.goodBoyCoins = 0;
game.paused = false;

// reserving keyboard variables
let keyW, keyA, keyS, keyD, keySPACE, keyQ, keyLEFT, keyESC;

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