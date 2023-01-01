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

		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
		
		//load menu graphics
		this.load.image('StartButton', 'assets/start-button.png');
		this.load.image('SettingsButton', 'assets/settings-button.png');
		this.load.image('ControlsButton', 'assets/controls-button.png');

		//load controls graphics
		this.load.image('ControlsHelp', 'assets/controls-help.png');
		this.load.image('x', 'assets/x.png');

		//load the phaser3 logo a bunch of times to simulate loading
		this.load.image('test', 'assets/libs.png');
		this.load.image('logo', 'assets/phaser3-logo.png');
		for (let i = 0; i < 100; i++) {
			this.load.image('logo'+i, 'assets/phaser3-logo.png');
		}
		
		//load TestShip
		this.load.spritesheet("TestShipSpritesheet", "assets/ships/TestShip/TestShipSheet.png", { frameWidth: 140, frameHeight: 340 });
		this.load.json("TestShipJSON", "assets/ships/TestShip/TestShip.JSON");

		//load the TestScenario
		this.load.json("PlayerJSON", "assets/TestScenario/Player.JSON");
		this.load.json("AIJSON", "assets/TestScenario/AI.JSON");
		this.load.json("SpawnLocations", "assets/TestScenario/SpawnLocations.JSON");

		//create the loading progress bar
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect((width/2) -160, (height/2) - 30, 320, 50);

		//add loading... text
		let loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				color: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		//add loading percentage text
		let percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				color: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		//add asset loading text which will display the asset currently loading
		let assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				color: '#ffffff'
			}
		});
		assetText.setOrigin(0.5, 0.5);
		
		//listen for loading progress
		this.load.on('progress', function (value) {
			//update the loading bar
			//console.log(value);
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect((width/2) -150, (height/2) - 20, 300 * value, 30);
			//update the percentage text
			percentText.setText(Math.floor(value * 100) + '%');
		});
		
		//listen for file progress
		this.load.on('load', function (file) {
			//update the loading file text with file being loaded
			assetText.setText('Loading asset: ' + file.key);
		});

		//listen for loading complete
		this.load.on('complete', function () {
			//destroy loading graphics
			console.log('complete');
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});
	}

	create() {
		//create the logo graphic
		console.log('Starting Menu');
		this.scene.start('Menu');
	}
}