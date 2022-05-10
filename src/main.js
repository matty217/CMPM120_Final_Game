// ARTG/CMPM 120 Endless Runner Game by Matty Hill, Micah Mahelona, Mrinmoyee Mishra


let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3000 },
            debug: true
        }
    },
    scene: [ Level1, Level3]
}


let game = new Phaser.Game(config);
game.settings = {
    worldSpeed: 8
};

// reserving keyboard variables
let keyW, keyA, keyS, keyD, keySPACE;

let sceneSwitcher = (event) => {
    //console.log("Key is: " + event.key);
    switch(event.key) {
        case '1':
            console.log('check1');
            game.scene.start('level1Scene');
            game.scene.bringToTop('level1Scene');
            game.scene.pause('level3Scene');
            break;
        case '3':
            console.log('check2');
            game.scene.start('level3Scene');
            game.scene.bringToTop('level3Scene');
            game.scene.pause('level1Scene');

            break;
        default:
                break;
    }
}