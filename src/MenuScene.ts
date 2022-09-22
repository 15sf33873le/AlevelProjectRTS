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

export default class MenuScene extends Phaser.Scene {
	constructor(config) {
		super(config);
	}

	create() {
		
		//startButton that logs 'Start Game' when pressed (add Game Scene)
		let startButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'StartButton')
			.setDepth(1)
			.setInteractive()
			.on('pointerover', ()=> {
				startButton.setScale(1.2);
			})
			.on('pointerout', ()=> {
				startButton.setScale(1);
			})
			.on('pointerup', ()=> {
				console.log('Start Game');
				this.scene.start('GameRun');
			});
		
		//settingsButton that logs 'Settings' when pressed (add settings scene)
		let settingsButton = this.add.image(this.game.renderer.width/2, (this.game.renderer.height/2) +100, 'SettingsButton')
			.setDepth(1)
			.setInteractive()
			.on('pointerover', ()=> {
				settingsButton.setScale(1.2);
			})
			.on('pointerout', ()=> {
				settingsButton.setScale(1);
			})
			.on('pointerup', ()=> {
				console.log('Settings');
			});

		//controlsButton, currently opens a placeholder controls Scene
		let controlsButton = this.add.image(this.game.renderer.width/2, (this.game.renderer.height/2) +200, 'ControlsButton')
			.setDepth(1)
			.setInteractive()
			.on('pointerover', ()=> {
				controlsButton.setScale(1.2);
			})
			.on('pointerout', ()=> {
				controlsButton.setScale(1);
			})
			.on('pointerup', ()=> {
				console.log('Controls');
				this.scene.launch('Controls');
			});
	}
}