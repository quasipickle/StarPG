Game.config.Phaser = {
	type: Phaser.AUTO,
	width:Game.config.game.width,
	height:Game.config.game.height,
	scene:[TestScene],
				pixelArt:true
};

Game.Phaser = new Phaser.Game(Game.config.Phaser);