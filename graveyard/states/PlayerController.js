import Ground_MoveLeftState from "./Ground_MoveLeftState"
import Ground_IdleState from "./Ground_IdleState"

class PlayerController
{
	states
	currentState


	
	constructor(player)
	{
		this.states = {
			groundIdle: new Ground_IdleState(player),
			groundLeft: new Ground_MoveLeftState(player)
		}
	}

	/**
	 * 
	 * @param {string} name 
	 */
	setState(name)
	{
		if (this.currentState === this.states[name])
		{
			return
		}

		this.currentState = this.states[name]
		this.currentState.enter()
	}
}