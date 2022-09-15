const config = {
  key: "LoadingScene",
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

export default class LoadingScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

	preload() {
		this.load.image('logo', 'assets/phaser3-logo.png');
	}

	create() {
		let logo = this.add.image(200, 200, 'logo');
	}
}