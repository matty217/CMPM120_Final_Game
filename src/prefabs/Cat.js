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
        this.WALL_JUMP_VEL_Y = -8000;
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

        if (this.double_jumped) {
            this.double_jumped = false;
        }

        // console.log(this.body.acceleration.x);
        // console.log(this.body.velocity.x);
        this.onGround = this.body.blocked.down;            //check to see if player is on the ground
        this.wallSliding = (!this.onGround && (this.body.blocked.left || this.body.blocked.right));         //check if player is in air and blocked wall
        //console.log((this.onGround == false && (this.body.blocked.right || this.body.blocked.left)));
        //console.log((Phaser.Input.Keyboard.JustDown(keySPACE)));

        if (this.alive) {

            if (this.wallSliding) {
                if (!this.slideLooping) {
                    game.slideSound.play();
                    this.slideLooping = true;
                }
                this.body.setDragY(this.WALL_DRAG);
                //this.body.setVelocityY(0)
                this.body.allowGravity = false;
                if (this.body.velocity.y < this.SLIDE_VEL) {
                    this.body.velocity.y += this.SLIDE_VEL/2;
                }
            } else {
                game.slideSound.stop();
                this.slideLooping = false;
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
                        this.anim_slide = false;
                        this.anim_idle = false;
                        this.anim_jumping = false;
                        this.anim_climb = false;
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
                        this.anim_slide = false;
                        this.anim_idle = false;
                        this.anim_jumping = false;
                        this.anim_climb = false;
                    }
                }
                //stop moving when no input
                if ((!keyA.isDown && !keyD.isDown)||(keyA.isDown && keyD.isDown)) {
                    this.body.setDragX(this.DRAG);
                    //this.addedXVelocity
                    this.play({ key: 'idle' });
                    this.anim_walking = false;
                    this.anim_slide = false;
                    this.anim_idle = true;
                    this.anim_jumping = false;
                    this.anim_climb = false;
                }

                // jump
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    // normal jump
                    this.sfxJump();
                    this.body.setVelocityY(this.JUMP_VEL);
                    console.log('Jump');
                    if (!this.anim_jumping) {
                        this.play({ key : 'jump' });
                        this.anim_jumping = true;
                        this.anim_walking = false;
                        this.anim_climb = false;
                        this.anim_slide = false;
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
                    }
                    this.play({ key: 'fall' });
                    this.anim_jumping = false;
                    this.anim_walking = false;
                    this.anim_climb = false;
                    this.anim_slide = false;
                }
                //move right
                if (keyD.isDown) {
                    this.flipX = false;
                    if (this.body.velocity.x < this.MAX_GROUND_VEL) {
                        this.body.velocity.x += this.ADDED_VEL*(3/4);
                    }
                    this.play({ key: 'fall' });
                    this.anim_jumping = false;
                    this.anim_walking = false;
                    this.anim_climb = false;
                    this.anim_slide = false;
                }
                //stop moving when no input
                if ((!keyA.isDown && !keyD.isDown)||(keyA.isDown && keyD.isDown)) {
                    this.body.setDragX(this.AIR_DRAG);
                    //this.addedXVelocity
                    this.play({ key: 'fall' });
                    this.anim_jumping = false;
                    this.anim_walking = false;
                    this.anim_climb = false;
                    this.anim_slide = false;
                }

                // jump
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    // double jump
                    if (this.jumps < this.maxAirJumps) {
                        this.sfxJump();
                        this.body.setVelocityY(this.AIR_JUMP_VEL);
                        console.log('Air Jump');
                        this.jumps += 1;
                        if (!this.anim_jumping) {
                            this.play({ key: 'jump' });
                            this.double_jumped = true;
                            this.anim_jumping = true;
                            this.anim_walking = false;
                            this.anim_climb = false;
                            this.anim_slide = false;
                        }
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
                    if (!this.anim_climb) {
                        this.play({key: 'climb'});
                        this.anim_climb = true;
                        this.anim_jumping = false;
                        this.anim_slide = false;
                    }
                } else {
                    this.play({ key : 'slide' });
                    this.anim_idle = false;
                    this.anim_jumping = false;
                    this.anim_walking = false;
                    this.anim_climb = false;
                }
                //move left
                if (keyA.isDown) {
                    if (this.body.velocity.x > -this.MAX_GROUND_VEL) {
                        this.body.velocity.x -= this.ADDED_VEL*(3/4);
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

                // if (keyS.isDown) {
                //     if (this.body.blocked.right) {
                //         this.body.setVelocityX(-this.MAX_GROUND_VEL);
                //         this.flipX = true;
                //     }
                //     else if (this.body.blocked.left) {
                //         this.body.setVelocityX(this.MAX_GROUND_VEL);
                //         this.flipX = false;
                //     }
                //}

                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    // wall jump
                    this.body.setVelocityY(this.WALL_JUMP_VEL_Y);
                    this.sfxJump();
                    if (this.body.blocked.right) {
                        this.body.setVelocityX(-this.WALL_JUMP_VEL_X);
                        this.flipX = true;
                    }
                    else if (this.body.blocked.left) {
                        this.body.setVelocityX(this.WALL_JUMP_VEL_X);
                        this.flipX = false;
                    }
                    console.log('Wall Jump');
                    if (!this.anim_jumping) {
                        this.play({key: 'jump'});
                        this.anim_climb = false;
                    }
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

    sfxJump() {
        var rand = Math.round(Math.random()*(2));

        if (rand == 0) {
            game.sfxJump1.play();
        }
        else if (rand == 1) {
            game.sfxJump2.play();
        }
        else {
            game.sfxJump3.play();
        }
    }
}
