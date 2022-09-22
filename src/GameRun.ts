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
	}
}