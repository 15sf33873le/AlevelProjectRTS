import 'phaser';
import config from './config';
import LoadingScene from './LoadingScene';

class Game extends Phaser.Game {
	constructor(config) {
		super(config);
		this.scene.add('Loading', LoadingScene);
		this.scene.start('Loading');
	}
}

const game = new Game(config);
