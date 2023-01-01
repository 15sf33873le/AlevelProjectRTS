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
	public MainPlayer;

	create() {

		this.playerlist.push(new Player(this.cache.json.get('PlayerJSON')));
		this.playerlist.push(new Player(this.cache.json.get("AIJSON")));



		for (let i = 0; i < this.playerlist.length; i++) {
			if (this.playerlist[i].ID == 0) {
				this.MainPlayer = this.playerlist[i];
			}
		}

		//this.shiplist[0].NewPath(path5Point1, path5Ang1, path5Point2, path5Ang2);

		graphics = this.add.graphics();


		//set up moust inputs
		//disable the context menu so that it doesn't interupt gameplay
		this.input.mouse.disableContextMenu();

		//mouse events
		this.input.on("pointerup", function (pointer) {
			if (typeof this.scene.MainPlayer.selectedShip === "undefined") return;
			if (!pointer.event.shiftKey) {
				this.scene.MainPlayer.selectedShip.clearPaths();
			}
			const endPoint = new Phaser.Math.Vector2(pointer.upX, pointer.upY)
			if (pointer.getDuration() < 150) {
				this.scene.MainPlayer.selectedShip.NewPath(endPoint);
				return;
            }
			const startPoint = new Phaser.Math.Vector2(pointer.downX, pointer.downY);
			const angle = Phaser.Math.Angle.BetweenPoints(startPoint, endPoint) * (180 / Math.PI);
			this.scene.MainPlayer.selectedShip.NewPath(startPoint, angle);
		});

		//generic keybinds
		this.input.keyboard.on("keydown", function (event) {
			switch (event.code) {
				case "KeyX":
					this.scene.MainPlayer.clearSelected();
            }
		});

		this.SpawnShips();

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
								this.scene.playerlist[i].selectedShip = this.scene.playerlist[i].controledShips[n];
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
		if (!this.shiplist[1].moveOrderQueue.isEmpty) {
			const lineToDraw = this.shiplist[1].moveOrderQueue.peek();
			lineToDraw.draw(graphics);
		}
		if (!this.shiplist[2].moveOrderQueue.isEmpty) {
			const lineToDraw = this.shiplist[2].moveOrderQueue.peek();
			lineToDraw.draw(graphics);
		}
	}
}