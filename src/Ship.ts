export default class Ship extends Phaser.GameObjects.Sprite {

	public directionVector: number[] = [0,-1];
	public velocity = 0;
	public accelTime = 0;
	public limit = 0; //(Math.E-1)/this.accelcoef
	public maxV = 0;
	public accelCoef = 0;
	public armorX: number[];
	public armorY: number[];
	public armorvX: number[];
	public armorvY: number[];

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number ) {
		super(scene, x, y, texture, frame);
		this.setOrigin(0, 0);
		scene.events.on('update', this.update, this)
	}

	SetVelocity(): void {
		this.velocity = this.maxV*(Math.E*Math.log1p(this.accelCoef*this.accelTime)-this.accelCoef*this.accelTime);
		console.log(this.velocity);
	}	// velocity = v*(e*Math.log1p(a*x)-a*x)

	Accelerate(acc: number, delta: number): void {
		
		let incTime: number;

		switch(acc) {
			case 0:
				break;
			case 1:
				incTime = this.accelTime + delta/1000;
				break;
			case 2:
				incTime = this.accelTime - delta/1000;
		}

		if (incTime < this.limit && incTime > 0) {
			this.accelTime = incTime;
		}
	}

	Move(acc: number = 0, delta: number): void {
		this.Accelerate(acc, delta);
		this.SetVelocity();
		console.log(this.velocity);
		this.x = this.x + delta/1000 * (this.directionVector[0] * this.velocity);
		this.y = this.y + delta/1000 * (this.directionVector[1] * this.velocity);
	} // acc is true for positive acceleration and false for negative acceleration
	update(time, delta) {
		this.Move(1,delta);
	}
}