import 'phaser';
import './Ship';
import './Player';
import Player from './Player';

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
	public playerlist = [];
	public 

	create() {

		this.playerlist.push(new Player(this.cache.json.get('PlayerJSON')));
		this.playerlist.push(new Player(this.cache.json.get("AIJSON")));
		console.log('gameRun active');

		this.SpawnShips();
		const point1 = new Phaser.Math.Vector2(200,200);
		const ang1 = -50;

		this.shiplist[0].NewPath(point1, ang1);

		const point2 = new Phaser.Math.Vector2(350, 321);
		const ang2 = 70;

		this.shiplist[0].NewPath(point2, ang2);

		const point3 = new Phaser.Math.Vector2(500, 321);

		this.shiplist[1].NewPath(point3);

		const point4 = new Phaser.Math.Vector2(700, 361);
		const ang3 = -70;

		this.shiplist[0].NewPath(point4, ang3);



		//this.shiplist[0].NewPath(path5Point1, path5Ang1, path5Point2, path5Ang2);

		graphics = this.add.graphics();
		console.log(this);
		console.log(this.playerlist);


		//set up moust inputs
		//disable the context menu so that it doesn't interupt gameplay
		this.input.mouse.disableContextMenu();

		//mouse events
		this.input.on("pointerup", function (pointer) {
			console.log(pointer);
			const startPoint = new Phaser.Math.Vector2(pointer.downX, pointer.downY);
			const endPoint = new Phaser.Math.Vector2(pointer.upX, pointer.upY)
			const angle = Phaser.Math.Angle.BetweenPoints(endPoint, startPoint);
			this.scene.shiplist[2].NewPath(startPoint, angle);
		});

	}

	SpawnShips() {
		const SpawnLocations = this.cache.json.get("SpawnLocations")
		for (let i = 0; i < this.playerlist.length; i++) {
			const playerID = this.playerlist[i].ID;
			for (let n = 0; n < this.playerlist[i].pendingShips.length; n++) {
				const pendingShip = this.playerlist[i].pendingShips[n];

				const Spawnlocation = SpawnLocations[playerID][n];
				const createdShip = this.add[pendingShip](Spawnlocation[0], Spawnlocation[1], pendingShip.concat("Spritesheet"))

				this.shiplist.push(createdShip);
				this.playerlist[i].controledShips.push(createdShip);

				if (playerID == 0) {
					const shipnum = n + 1;
					const shipnumstring = shipnum.toString();
					this.input.keyboard.on("keydown", function (event) {
						switch (event.code) {
							case "Digit" + shipnumstring:
							case "Numpad" + shipnumstring:
								console.log(shipnumstring + " pressed");
								this.scene.playerlist[0].selectedShip = this.scene.playerlist[0].controledShips[n];
							break;
                        }
					});
				}
				delete this.playerlist[i].pendingShips[n];
			}
		}
    }
	
	update() {

		graphics.clear();

		graphics.lineStyle(2, 0xffffff, 1);

		if (typeof this.playerlist[0].selectedShip !== "undefined") {
			console.log("trying");
			graphics.beginPath();
			graphics.arc(this.playerlist[0].selectedShip.x, this.playerlist[0].selectedShip.y, 40, 0.3927, 1.1781);
			graphics.strokePath();
			graphics.beginPath();
			graphics.arc(this.playerlist[0].selectedShip.x, this.playerlist[0].selectedShip.y, 40, 1.9635, 2.7489);
			graphics.strokePath();
			graphics.beginPath();
			graphics.arc(this.playerlist[0].selectedShip.x, this.playerlist[0].selectedShip.y, 40, 3.5343, 4.3197);
			graphics.strokePath();
			graphics.beginPath();
			graphics.arc(this.playerlist[0].selectedShip.x, this.playerlist[0].selectedShip.y, 40, 5.1051, 5.8905);
			graphics.strokePath();
			//yes all of this to produce a simple pattern...
		}

		if (!this.shiplist[0].moveOrderQueue.isEmpty) {
			const lineToDraw = this.shiplist[0].moveOrderQueue.peek();
			lineToDraw.draw(graphics);
		}
	}
}