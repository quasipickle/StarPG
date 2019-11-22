class Entity extends Phaser.Physics.Matter.Sprite{
	/**
	 * An array of strings used to describe the type of entity
	 * Each extending class should add its own descriptor.
	 * Used by is(), for example, when detecting collisions
	 * to determine if an entity is a shot or a ship
	 */
	_typeDescriptors = [];


	constructor(scene,x,y,frame){
		super(
			scene.matter.world,
			x,
			y,
			Game.config.game.atlasName,
			frame
		);
		this.scene.add.existing(this);
		this.addTypeDescriptor('entity');
		this.setFriction(0,0,0);

	}

	/**
	 * Add a string that describes this class
	 * @param {string} descriptor Any arbitrary string that should be unique to the class
	 */
	addTypeDescriptor(descriptor){
		this._typeDescriptors.push(descriptor);
	}

	/**
	 * Check if this object is described with the passed word
	 * @param  {string}  descriptor The descriptor
	 * @return {Boolean}            Whether or not this object is described with the passed word.
	 */
	is(descriptor){
		return this._typeDescriptors.indexOf(descriptor) >= 0;
	}
}