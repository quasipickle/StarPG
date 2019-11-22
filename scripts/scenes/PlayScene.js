class PlayScene extends BaseScene{
	constructor(){
		super({
			key:'play',
			active:true,
			physics:{
				default:"matter",
				matter:{
					gravity:{
						y:0
					},
					debug:true
				}
			},

		});
	}

	preload(){
		/**
		 * Preloader events for preloader progress bar
		 
		this.load.on("progress",value=>{
			console.log("progress:",value);
		});
		this.load.on("fileprogress",value=>{
			console.log("fileprogress:",value);
		});
		this.load.on("complete",value=>{
			console.log("complete:",value);
		});
		*/
		this.load.multiatlas('ship-atlas','assets/ships/ships.json','assets/ships');
		this.load.image('sky','https://labs.phaser.io/assets/skies/deep-space.jpg');
	}

	create(){
		this.cameras.main.useBounds = false;
		this.matter.world.setBounds(
			Game.config.game.world.width/2,
			Game.config.game.world.height/2,
			Game.config.game.world.width,
			Game.config.game.world.height
		);

		let background = this.add.tileSprite(0,0,800,600,'sky');
		background.width = Game.config.game.world.width,
		background.height = Game.config.game.world.height;


		Game.Player = new Ship(this,Game.config.game.width/2,Game.config.game.height/2,'courier');
		Game.Player.setDepth(Game.config.z.player);
		// this.matter.add.worldConstraint(Game.Player.body, 1, 0.2);
		
		Game.Enemy = new Ship(this,Game.config.game.width/2,100,'enemy');

		Game.colCats  = {
			ships:this.matter.world.nextCategory(),
			enemyShots:this.matter.world.nextCategory(),
			playerShots:this.matter.world.nextCategory()
		};

		// Game.Player.setCollisionCategory(Game.colCats.ships);
		// Game.Enemy.setCollisionCategory(Game.colCats.ships);

		Game.Player.setCollidesWith([Game.colCats.enemyShots]);
		Game.Enemy.setCollidesWith([Game.colCats.playerShots]);

		this.matter.world.on('collisionstart',(e,bodyA,bodyB)=>{
			[bodyA,bodyB].forEach(body=>{
				if(body.gameObject.is('shot')){
					body.gameObject.destroy();
				}
				else if(body.gameObject.is('ship')){
					body.gameObject.setTintFill(0xffffff);
					this.time.delayedCall(50,function(){
						this.tintFill = false;
					},null,body.gameObject);
				}	
			});
		});


		this.cameras.main.startFollow(Game.Player);

		Game.cursors = this.input.keyboard.createCursorKeys();
		Game.createKey(this,'SPACE');
	}

	update(){
		/**
		 * Player control
		 */
		if(Game.cursors.up.isDown){
			Game.Player.accelerate();
		}
		else{
			Game.Player.notAccelerating();
		}

		if(Game.cursors.left.isDown){
			Game.Player.turnLeft();
		}
		if(Game.cursors.right.isDown){
			Game.Player.turnRight();
		}
		if(Game.cursors.down.isDown){
			Game.Player.reverse();
		}

		
		/**
		 * Shooting
		 */
		if(Phaser.Input.Keyboard.JustDown(Game.getKey('SPACE'))){
			Game.Player.shoot();
		}
	}
}