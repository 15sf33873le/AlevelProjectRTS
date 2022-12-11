import 'phaser';
import GameConfig from './config';
import LoadingScene from './LoadingScene';
import MenuScene from './MenuScene';
import ControlsScene from './ControlsScene';
import GameRun from './GameRun';

class Game extends Phaser.Game {
	constructor(GameConfig) {
		super(GameConfig);
		//add scenes
		this.scene.add('Loading', LoadingScene);
		this.scene.add('Menu', MenuScene);
		this.scene.add('Controls', ControlsScene);
		this.scene.add('GameRun', GameRun);

		//start loading the game
		this.scene.start('Loading');
	}
}

let game = new Game(GameConfig);