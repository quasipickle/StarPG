let Game = {
	cursors:null,
	keys:{},
	Phaser:null,
	Player:null,

	/**
	 * For creating keys for listening
	 * @param  {string} key The name of the key.  Must be a property of Phaser.Input.Keyboard.KeyCodes
	 * @return {[type]}     [description]
	 */
	createKey:function(scene,key){
		this.keys[key] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key]);
	},
	getKey:function(key){
		return this.keys[key];
	}
};