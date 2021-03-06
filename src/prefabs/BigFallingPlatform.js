class BigFallingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, playerPosX, playerPosY) {
        super(scene, x, y, texture, frame, playerPosX, playerPosY);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.playerPosX = this.scene.player.x;
        this.playerPosY = this.scene.player.y;
        this.target = this.scene.player;
        this.body.allowGravity = false;
        this.body.immovable = true;
    }

    update() {
        console.log('fall2');
        // console.log('playerpos', this.playerPosX, this.playerPosY);
        // console.log('platform and cat y', this.y, this.target.y);
        // console.log('platform and cat x', this.x, this.target.x);
    
        // if ((this.target.x <this.x+1536) && (this.target.x > this.x-1536) ) {
        //     console.log('x is the same');
        // }
        // if ((this.target.y <this.y+512) && (this.target.y > this.y-512)) {
        //     console.log('y is the same');
        // }
        if ((this.target.x <this.x+1536) && (this.target.x > this.x-1536)  && (this.target.y == (this.y-512))) {
        // if ((this.target.x <this.x+512) && (this.target.x > this.x-1024) && (this.target.y <this.y+512) && (this.target.y > this.y-512)) {
            console.log('fall check');
            this.fallActivate();
        }
        
        
        // if ((this.x == this.target.x) && (this.y == this.target.y)) {
        //     console.log('fall');
        //     this.fallActivate();
        // } else {
        //     this.x += 0;
        //     this.y += 0;
        // }
        
        // this.fallActivate();
        
    }

    fallActivate() {
        this.body.setVelocityY(1300);
    }
}
