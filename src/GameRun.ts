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
		const ang1 = -50;
		const point2 = new Phaser.Math.Vector2(800,600);
		const ang2 = -30;
		
		this.shiplist[0].NewPath(point1,ang1,point2,ang2);

		const path4Point1 = new Phaser.Math.Vector2(800, 600);
		const path4Ang1 = -30;
		const path4Point2 = new Phaser.Math.Vector2(1300, 75);
		const path4Ang2 = -1;

		this.shiplist[0].NewPath(path4Point1, path4Ang1, path4Point2, path4Ang2);

		const path5Point1 = new Phaser.Math.Vector2(1300,75);
		const path5Ang1 = -1;
		const path5Point2 = new Phaser.Math.Vector2(1301,76);
		const path5Ang2 = 179.99999999;

		this.shiplist[0].NewPath(path5Point1, path5Ang1, path5Point2, path5Ang2);

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