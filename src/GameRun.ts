import 'phaser';
import './Ship';

const config = {
  key: "GameRun",
  // active: false,
  // visible: true,
  // pack: false,
  // cameras: null,
  // map: {},
  // physics: {},
  // loader: {},
  // plugins: false,
  // input: {}
};


let graphics: Phaser.GameObjects.Graphics;

export default class GameRun extends Phaser.Scene {

	public shiplist = [];

	create() {

		console.log('gameRun active');
		let shipName = "testship";
		this.shiplist.push(this.add[shipName](500, 500, "TestShipSpritesheet"));
		console.log(this.shiplist[0]);
		
		const point1 = new Phaser.Math.Vector2(200,200);
		const ang1 = -115;
		const point2 = new Phaser.Math.Vector2(400,100);
		const ang2 = 0;
		
		this.shiplist[0].NewPath(point1,ang1,point2,ang2);

		const point3 = new Phaser.Math.Vector2(400,100);
		const ang3 = 0;
		const point4 = new Phaser.Math.Vector2(900,800);
		const ang4 = 70;

		this.shiplist[0].NewPath(point3,ang3,point4,ang4);

		const path3Point1 = new Phaser.Math.Vector2(900,800);
		const path3Ang1 = 70;
		const path3Point2 = new Phaser.Math.Vector2(300,400);
		const path3Ang2 = -80;

		this.shiplist[0].NewPath(path3Point1,path3Ang1,path3Point2,path3Ang2);

		graphics = this.add.graphics();
		console.log(this);
	}
	
	update() {
		graphics.clear();

		graphics.lineStyle(2, 0xffffff, 1);

		if (!this.shiplist[0].moveOrderQueue.isEmpty) {
			const lineToDraw = this.shiplist[0].moveOrderQueue.peek();
			lineToDraw.draw(graphics);
		}

		graphics.fillStyle(0xff0000, 1);
	}
}