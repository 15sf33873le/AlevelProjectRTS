import 'phaser';

class Queue {
	
	private elements = {};
	private head = 0;
	private tail = 0;

	enqueue(element) {
		this.elements[this.tail] = element;
		this.tail++;
	}
	dequeue() {
		const item = this.elements[this.head];
		this.elements[this.head].destroy();
		delete this.elements[this.head];
		this.head++;
		return item;
	}
	peek() {
		return this.elements[this.head];
	}
	get length() {
		return this.tail - this.head;
	}
	get isEmpty() {
		return this.length === 0;
	}
}

class MovePath extends Phaser.Curves.Path {

	constructor(point1: Phaser.Math.Vector2, ang1: number, point2: Phaser.Math.Vector2, ang2: number, TurnR: number) {
		//call the constructor from the Path class
		super(point1.x,point1.y);
		
		//find the angle between the two points
		const travelAngle: number = Phaser.Math.Angle.BetweenPoints(point1, point2) * (180/Math.PI);
		console.log(travelAngle);
		//find turn directions

		//if ang1-travelAngle < 0 clockwise
		let turn1Clockwise: boolean = (ang1 - travelAngle < 0);
		//if travelAngle-ang2 < 0 clockwise
		const turn2Clockwise: boolean = (travelAngle - ang2 < 0);

		console.log(turn1Clockwise);
		console.log(turn2Clockwise);

		//assigns the first turning circle center to point1 and the transformation from original point1 to the first turning circle center in CenterTranslation1
		const CenterTranslation1 = MovePath.FindTurningCircle(point1,ang1,TurnR,turn1Clockwise);	
		
		
		//assigns the second turning circle center to point2 and the transformation from original point2 to the second turning circle center in CenterTranslation2
		const CenterTranslation2 = MovePath.FindTurningCircle(point2,ang2,TurnR,turn2Clockwise);
		
		//find the translation between the two circle centers (point1 and point2)
		const interCenterTranslation = point2.clone();
		interCenterTranslation.subtract(point1);

		
		const TransitionRadiusAngle = interCenterTranslation.angle() * (180 / Math.PI) - 90;

		let rotation = 0

		if (!turn1Clockwise && !turn2Clockwise) {
			rotation = 180;
		}


		//this.ellipseTo(50,50,ang1+90,turn1,true,0);

		//this.ellipseTo(TurnR, TurnR, ang1 - 90, TransitionRadiusAngle, !turn1Clockwise, 0);
		this.ellipseTo(TurnR, TurnR, ang1 - 90, TransitionRadiusAngle, !turn1Clockwise, rotation);


		//create the straight section between the two turns
		const StraightTranslation = interCenterTranslation.clone();
		StraightTranslation.add(this.getEndPoint());
		this.lineTo(StraightTranslation);

		//create the second elipse curve representing turn2

		//this.ellipseTo(TurnR, TurnR, TransitionRadiusAngle, ang2 - 90, !turn2Clockwise, 0);
		this.ellipseTo(TurnR, TurnR, TransitionRadiusAngle, ang2 - 90, !turn1Clockwise, rotation);

		console.log(this.getEndPoint());
	}//phaser.math.angle.BetweenPoints(interCenterTranslation,)

	//determines the location of a turning circle
	static FindTurningCircle(point: Phaser.Math.Vector2, ang: number, TurnR: number, TurnDir: boolean) {
		
		const Translation = new Phaser.Math.Vector2(TurnR,0);
		
		const tempAngle = (TurnDir ? ang + 90 : ang - 90)*(Math.PI/180);
		
		Translation.setAngle(tempAngle);
		
		point.add(Translation);
		
		return Translation;
	}

	getPointDistance(d: number) {
		let outPoint = new Phaser.Math.Vector2();
		let outDirection = new Phaser.Math.Vector2();

        const curveLengths = this.getCurveLengths();
        let i = 0;

        while (i < curveLengths.length)
        {
            if (curveLengths[i] >= d)
            {
                var diff = curveLengths[i] - d;
                var curve = this.curves[i];

                var segmentLength = curve.getLength();
                var u = (segmentLength === 0) ? 0 : 1 - diff / segmentLength;

				return [curve.getPointAt(u, outPoint), curve.getTangentAt(u, outDirection)];
            }

            i++;
        }

        // loop where sum != 0, sum > d , sum+1 <d
        return null;
	}

}

export default class Ship extends Phaser.GameObjects.Sprite {

	public velocity = 0;
	public accelTime = 0;
	public limit = 0; //(Math.E-1)/this.accelcoef
	public maxV = 0;
	public accelCoef = 0;
	public moveOrderQueue = new Queue();
	public TurnR = 0;
	public TempDisplacement: number = 0;

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number ) {
		super(scene, x, y, texture, frame);
		return Object.assign(this, scene.cache.json.get('TestShipJSON'));
	}

	Accelerate(): number{
		return this.velocity = this.maxV*(Math.E*Math.log1p(this.accelCoef*this.accelTime)-this.accelCoef*this.accelTime);
	}	// velocity = v*(e*Math.log1p(a*x)-a*x)

	UpdateAccelTime(acc: boolean, delta: number): void {
		
		let incTime: number;

		if (acc) {
			incTime = this.accelTime + delta/1000;
		} 
		else {
			incTime = this.accelTime - delta/1000;
		}

		if (incTime < this.limit && incTime > 0) {
			this.accelTime = incTime;
		}
	}

	Move(delta: number): void {
		if (this.moveOrderQueue.isEmpty) return;
		const moveOrder = this.moveOrderQueue.peek();
		this.UpdateAccelTime(true,delta);
		this.TempDisplacement = this.TempDisplacement + this.Accelerate() * (delta/1000);
		const commands = moveOrder.getPointDistance(this.TempDisplacement);
		if (!commands) {
			this.moveOrderQueue.dequeue();
			this.TempDisplacement = 0
			console.log("current coordinates");
			console.log(this.x);
			console.log(this.y);
			this.Move(delta);
			return;
		}

		this.x = commands[0].x;
		this.y = commands[0].y;
		
		this.setRotation(commands[1].angle()+Math.PI/2);
	}
	NewPath(point1, ang1, point2, ang2): void{
		const PendingOrder = new MovePath(point1,ang1,point2,ang2,this.TurnR)
		let drawnPath = new Phaser.GameObjects.Graphics(this.scene);
		drawnPath.lineStyle(5, 0xFF00FF, 1.0);
		PendingOrder.draw(drawnPath);
		this.moveOrderQueue.enqueue(PendingOrder);
	}
	update(time, delta) {
		this.Move(delta);
	}
}

Phaser.GameObjects.GameObjectFactory.register('testship', function (this: Phaser.GameObjects.GameObjectFactory, x, y, key, frame) {
		console.log("making testship");
		const testship = new Ship(this.scene, x, y, key, frame);
		testship.setOrigin(0.5, 0.5);
		testship.setScale(0.2);
		console.log(testship);
		this.displayList.add(testship);
		this.updateList.add(testship);
		this.scene.events.on('update', testship.update, testship);
		return testship;
});