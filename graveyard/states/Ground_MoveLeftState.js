class Ground_MoveLeftState
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
	player

	/**
	 * @param {Phaser.Physics.Arcade.Sprite} player 
	 */
	constructor(player)
	{
		this.player = player
	}

    enter() {
        if (this.body.velocity.x <= -600) {
            this.body.setAccelerationX(0);
        }
        else {
            if (this.body.acceleration.x > 0 && this.onGround) {
                this.body.setVelocityX(0);
            }
            this.body.setAccelerationX(this.acceleration.x - this.ACCELERATION);
        }
    }
}