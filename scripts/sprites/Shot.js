class Shot extends Entity{
	constructor(scene,source,frame,speed,duration){
		super(
			scene,
			source.x,
			source.y,
			frame
		);
		this.addTypeDescriptor('shot');
		
		let radians = source.rotation,
			velX 	= Math.sin(radians) * speed,
			velY 	= -Math.cos(radians) * speed;

		this.setDepth(Game.config.z.playerShot)
			.setVelocity(velX,velY)
			// Makes the shot collide with any entity that collides with playerShots category
			.setCollisionCategory(Game.colCats.playerShots)
			// Any object with the same negative collision group, won't collide with each other
			// so shots won't collide with each other
			.setCollisionGroup(-1)
			.setSensor(true)
			.setRotation(source.rotation)

		scene.time.delayedCall(duration,this.fizzled,null,this);
	}

	fizzled(){
		this.destroy()
	}
}