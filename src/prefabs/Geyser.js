class Geyser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
    }

    create() {
        this.on = false;
        this.partOn = true;
    }

    update() {
        if (!this.on) {
            let geyserOn = this.time.addEvent({ delay: 1200, callback: () =>{
                this.partOn = true;
                let geyserOff = this.time.addEvent({ delay: 1000, callback: () =>{
                    this.partOn = false;
                    this.on = false;
            }})}});
            this.on = true;
        }
    }
}
