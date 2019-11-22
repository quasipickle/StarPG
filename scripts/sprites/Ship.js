class Ship extends Entity{
	config = {};

	constructor(scene,x,y,key){
		let config = Game.config.ships[key];
		super(
			scene,
			x,
			y,
			config.frame
		);
		this.config = config;
		this.addTypeDescriptor('ship');
	}

	shoot(){
		let Laser = new ShotLaser(this.scene,this);
	}

	accelerate(){
		this.setFrame(this.config.frameAccelerate);

		let radians = this.rotation,
			velX = Math.sin(radians) * this.config.enginePower,
			velY = -Math.cos(radians) * this.config.enginePower;

		this.applyForce({x:velX,y:velY});
	}

	notAccelerating(){
		this.setFrame(this.config.frame);
	}

	turnLeft(){
		this.rotation -= this.config.rotationPower;
	}

	turnRight(){
		this.rotation += this.config.rotationPower;
	}

	reverse(){
		let {x,y} = this.body.velocity;
		if(x != 0 || y != 0){
			let reverseThetaV = Math.atan2(-y,-x) + (Math.PI/2),
				diff          = Phaser.Math.Angle.ShortestBetween(Phaser.Math.RadToDeg(reverseThetaV),this.angle);
			
			// if the amount left is < 1 degree, just jump to it
			if(Math.abs(diff) < 1){
				this.rotation = reverseThetaV;
			}
			else{
				if(diff > 0){
					this.turnLeft();
				}
				else{
					this.turnRight();
				}
			}
		}
	}
}