class Ground_IdleState
{
	player

	constructor(player)
	{
		this.player = player
	}

    enter() {
        console.log('idle state');
        // this.body.setAccelerationX(0);
        this.body.setDragX(this.DRAG);
    }
}