class ShotLaser extends Shot{
	constructor(scene,source){
		super(
			scene,
			source,
			'laser.png',
			Game.config.shot.laser.speed,
			Game.config.shot.laser.duration
		);

		this.addTypeDescriptor('laser');
	}
}