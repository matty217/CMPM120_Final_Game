class Cat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.maxAirJumps = 1;
        this.jumps = 0;
        this.DRAG = 25000;    // DRAG < ACCELERATION = icy slide
        this.AIR_DRAG = 15000;
        this.WALL_DRAG = 20000;
        this.ACCELERATION = 25000;
        this.MAX_GROUND_VEL = 3000;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.JUMP_VEL = -8000;
        this.AIR_JUMP_VEL = -6000;
        this.WALL_JUMP_VEL_Y = -6000;
        this.WALL_JUMP_VEL_X = 7500;
        this.CLIMB_VEL = -2500;
        this.ADDED_VEL = 750;
        this.SLIDE_VEL = 1500;
        this.addedXVelocity = 0;
        this.hurt = false;
        this.alive = true;

        this.anim_walking = false;
        this.anim_jumping = false;
        this.anim_climb = false;
        this.anim_slide = false;
        this.anim_idle = false;
    }

    create() {
        console.log('hi');
    }

    update() {


        // console.log(this.body.acceleration.x);
        // console.log(this.body.velocity.x);
        this.onGround = this.body.blocked.down;            //check to see if player is on the ground
        this.wallSliding = (!this.onGround && (this.body.blocked.left || this.body.blocked.right));         //check if player is in air and blocked wall
        //console.log((this.onGround == false && (this.body.blocked.right || this.body.blocked.left)));
        //console.log((Phaser.Input.Keyboard.JustDown(keySPACE)));

        if (this.alive) {

            if (this.wallSliding) {
                this.body.setDragY(this.WALL_DRAG);
                //this.body.setVelocityY(0)
                this.body.allowGravity = false;
                if (this.body.velocity.y < this.SLIDE_VEL) {
                    this.body.velocity.y += this.SLIDE_VEL/2;
                }
                this.play({ key : 'slide' });
                this.anim_slide = true;
                this.anim_idle = false;
                this.anim_jumping = false;
                this.anim_walking = false;
            } else {
                this.body.setDrag(0);
                this.body.allowGravity = true;
            }

            if (this.onGround) {            //reset jump counter when on the ground
                this.jumps = 0;
            }

    // STATE ON GROUND -----------------------------------------------------------------------
            if (this.onGround)
            {
                this.anim_jumping = false;
                //move left
                if (keyA.isDown) {
                    this.flipX = true;
                    if (this.body.velocity.x > -this.MAX_GROUND_VEL) {
                        this.body.velocity.x -= this.ADDED_VEL;
                    }
                    if (!this.anim_walking) {
                        this.play({ key : 'walk' });
                        this.anim_walking = true;
                    }
                }
                //move right
                if (keyD.isDown) {
                    this.flipX = false;
                    if (this.body.velocity.x < this.MAX_GROUND_VEL) {
                        this.body.velocity.x += this.ADDED_VEL;
                    }
                    if (!this.anim_walking) {
                        this.play({ key : 'walk' });
                        this.anim_walking = true;
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
                    if (!this.anim_jumping) {
                        this.play({ key : 'jump' });
                        this.anim_jumping = true;
                        this.anim_walking = false;
                    }
                }
            }

    // STATE IN AIR -------------------------------------------------------------------------
            else if (!this.onGround && !this.wallSliding)
            {
                //move left
                if (keyA.isDown) {
                    this.flipX = true;
                    if (this.body.velocity.x > -this.MAX_GROUND_VEL) {
                        this.body.velocity.x -= this.ADDED_VEL*(3/4);
                    } else {
                    }
                }
                //move right
                if (keyD.isDown) {
                    this.flipX = false;
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
                    if (this.body.blocked.right) {
                        this.body.setVelocityX(this.ADDED_VEL);
                    }
                    else if (this.body.blocked.left) {
                        this.body.setVelocityX(-this.ADDED_VEL);
                    }
                }

                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    // wall jump
                    this.body.setVelocityY(this.WALL_JUMP_VEL_Y);
                    if (this.body.blocked.right) {
                        this.body.setVelocityX(-this.WALL_JUMP_VEL_X);
                    }
                    else if (this.body.blocked.left) {
                        this.body.setVelocityX(this.WALL_JUMP_VEL_X);
                    }
                    console.log('Wall Jump');
                }
                
            }
            if (Phaser.Input.Keyboard.JustDown(keyQ)) {
                game.sound.play('meow');
            }    
        }
        else {
            this.setVelocity(0,0);
        }
    }
}
