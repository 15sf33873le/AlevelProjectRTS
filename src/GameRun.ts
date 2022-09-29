import Ship from './Ship';

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

export default class GameRun extends Phaser.Scene {
	constructor(config) {
		super(config);
	}


	create() {
		console.log('gameRun active');
		console.log(this.cache.json.get('TestShipJSON'));
		this.add.existing(Object.assign(new Ship(this,500,500,"TestShipSpritesheet"), this.cache.json.get('TestShipJSON')));
		//this.sys.updateList.add(TestShip1);
		//this.sys.displayList.add(TestShip1);
		console.log(this.sys.updateList);
		//console.log(TestShip1);
	}
	
	update() {
		
	}
}