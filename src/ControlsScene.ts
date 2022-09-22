const config = {
  key: "ControlsScene",
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

export default class ControlsScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

	create() {
		//controls help image
		this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'ControlsHelp').setDepth(10);
		
		//close controls help option
		let controlsClose = this.add.image((this.game.renderer.width/2) + 690, (this.game.renderer.height/2) -470, 'x')
			.setDepth(11)
			.setInteractive()
			.on('pointerover', ()=> {
				controlsClose.setScale(1.2);
			})
			.on('pointerout', ()=> {
				controlsClose.setScale(1);
			})
			.on('pointerup', ()=> {
				console.log('Close controls help');
				this.scene.stop();
			});
	}

}