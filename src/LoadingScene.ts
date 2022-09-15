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
		
		//load the phaser3 logo a bunch of times to simulate loading
		this.load.image('test', 'assets/libs.png');
		this.load.image('logo', 'assets/phaser3-logo.png');
		for (let i = 0; i < 500; i++) {
			this.load.image('logo'+i, 'assets/phaser3-logo.png');
		}
		
		//create the loading progress bar
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);

		//add loading... text
		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
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
			progressBar.fillRect(250, 280, 300 * value, 30);
			//update the percentage text
			percentText.setText(Math.floor(value * 100) + '%');
		});
		
		//listen for file progress
		this.load.on('load', function (file) {
			//update the loading file text with file being loaded
			console.log(file.src);
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
		let logo = this.add.image(400, 300, 'logo');
	}
}