class Cat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.maxJumps = 2;
        this.jumps = 0;
    }

    create() {
        this.setMaxVelocity(10);
    }

    update() {
        this.onGround = this.body.touching.down;            //check to see if player is on the ground

        if (this.onGround) {            //reset jump counter when on the ground
            this.jumps = 0;
        }

        //move left
        if (keyA.isDown) {
            this.setVelocityX(-500);
        }
        //move right
        else if (keyD.isDown) {
            this.setVelocityX(500);
        }
        //stop moving when no input
        if (!keyA.isDown && !keyD.isDown) {
            this.setVelocityX(0);

        }

        // jump
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && (this.onGround || this.jumps < this.maxJumps)) {
            this.setVelocityY(-1000);
            console.log('Jump');
            this.jumps += 1;
        }

        // wall jump
        if ((!this.onGround && (this.body.touching.right || this.body.touching.left))) {
            console.log('TOUCH Wall');
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.setVelocityY(-800);
                console.log('Wall Jump');
            }
        }
    }
}