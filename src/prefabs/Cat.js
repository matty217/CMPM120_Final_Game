class Cat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.maxAirJumps = 1;
        this.jumps = 0;
        this.DRAG = 5000;    // DRAG < ACCELERATION = icy slide
        this.AIR_DRAG = 3000;
        this.WALL_DRAG = 4000;
        this.ACCELERATION = 5000;
        this.MAX_GROUND_VEL = 800;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.JUMP_VEL = -1500;
        this.AIR_JUMP_VEL = -1200;
        this.WALL_JUMP_VEL_Y = -1200;
        this.WALL_JUMP_VEL_X = 1500;
        this.CLIMB_VEL = -500;
        this.ADDED_VEL = 150;
        this.SLIDE_VEL = 300;
        this.addedXVelocity = 0;
    }

    create() {
        console.log('hi');
    }

    update() {
        // console.log(this.body.acceleration.x);
        // console.log(this.body.velocity.x);
        console.log(this.wallSliding);
        this.onGround = this.body.touching.down;            //check to see if player is on the ground
        this.wallSliding = (!this.onGround && (this.body.touching.left || this.body.touching.right));         //check if player is in air and touching wall
        //console.log((this.onGround == false && (this.body.touching.right || this.body.touching.left)));
        //console.log((Phaser.Input.Keyboard.JustDown(keySPACE)));

        if (this.wallSliding) {
            this.body.setDragY(this.WALL_DRAG);
            this.body.allowGravity = false;
            if (this.body.velocity.y < this.SLIDE_VEL) {
                this.body.velocity.y += 100;
            }
        } else {
            this.body.setDragY(0);
            this.body.allowGravity = true;
        }

        if (this.onGround) {            //reset jump counter when on the ground
            this.jumps = 0;
        }

// STATE ON GROUND -----------------------------------------------------------------------
        if (this.onGround)
        {
            //move left
            if (keyA.isDown) {
                if (this.body.velocity.x > -this.MAX_GROUND_VEL) {
                    this.body.velocity.x -= this.ADDED_VEL;
                } else {
                }
            }
            //move right
            if (keyD.isDown) {
                if (this.body.velocity.x < this.MAX_GROUND_VEL) {
                    this.body.velocity.x += this.ADDED_VEL;
                }
            }
            //stop moving when no input
            if ((!keyA.isDown && !keyD.isDown)||(keyA.isDown && keyD.isDown)) {
                this.body.setDragX(this.DRAG);
                //this.addedXVelocity

            }

            // jump
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                // normal jump
                this.body.setVelocityY(this.JUMP_VEL);
                console.log('Jump');
            }
        }

// STATE IN AIR -------------------------------------------------------------------------
        else if (!this.onGround && !this.wallSliding)
        {
            //move left
            if (keyA.isDown) {
                if (this.body.velocity.x > -this.MAX_GROUND_VEL) {
                    this.body.velocity.x -= this.ADDED_VEL*(3/4);
                } else {
                }
            }
            //move right
            if (keyD.isDown) {
                if (this.body.velocity.x < this.MAX_GROUND_VEL) {
                    this.body.velocity.x += this.ADDED_VEL*(3/4);
                }
            }
            //stop moving when no input
            if ((!keyA.isDown && !keyD.isDown)||(keyA.isDown && keyD.isDown)) {
                this.body.setDragX(this.AIR_DRAG);
                //this.addedXVelocity

            }

            // jump
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                // double jump
                if (this.jumps < this.maxAirJumps) {
                    this.body.setVelocityY(this.AIR_JUMP_VEL);
                    console.log('Air Jump');
                    this.jumps += 1;
                }
            }
        }

// STATE WALL SLIDING ---------------------------------------------------------------------------
        else if (this.wallSliding)
        {
            // CLIMBING ---------------------
            if (keyW.isDown) {
                console.log('CLIMBING');
                this.body.velocity.y = this.CLIMB_VEL;
            }
            //move left
            if (keyA.isDown) {
                if (this.body.velocity.x > -this.MAX_GROUND_VEL) {
                    this.body.velocity.x -= this.ADDED_VEL*(3/4);
                } else {
                }
            }
            //move right
            if (keyD.isDown) {
                if (this.body.velocity.x < this.MAX_GROUND_VEL) {
                    this.body.velocity.x += this.ADDED_VEL*(3/4);
                }
            }
            //stop moving when no input
            if ((!keyA.isDown && !keyD.isDown)||(keyA.isDown && keyD.isDown)) {
                this.body.setDragX(this.DRAG);
                if (this.body.touching.right) {
                    this.body.setVelocityX(this.ADDED_VEL);
                }
                else if (this.body.touching.left) {
                    this.body.setVelocityX(-this.ADDED_VEL);
                }
            }

            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                // wall jump
                this.body.setVelocityY(this.WALL_JUMP_VEL_Y);
                if (this.body.touching.right) {
                    this.body.setVelocityX(-this.WALL_JUMP_VEL_X);
                }
                else if (this.body.touching.left) {
                    this.body.setVelocityX(this.WALL_JUMP_VEL_X);
                }
                console.log('Wall Jump');
                }
                
        }
    }
}