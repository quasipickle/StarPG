/**
 * This scene tests animations from a sprite sheet, while keeping the physics box snug
 */

class TestScene extends BaseScene{
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
		this.load.multiatlas('sprite-atlas','assets/ships/sprites.json','assets/ships');
		this.load.image('sky','https://labs.phaser.io/assets/skies/deep-space.jpg');
	}

	create(){
		let background = this.add.tileSprite(0,0,800,600,'sky');
		background.width = Game.config.game.world.width,
		background.height = Game.config.game.world.height;


		this.player = this.matter.add.sprite(400,300,'sprite-atlas','1.png');
		this.player.setScale(4);
		this.anims.create({
			key:'still',
			frames:this.anims.generateFrameNames('sprite-atlas',{
				start:1,
				end:2,
				suffix:'.png'
			}),
			frameRate:8,
			repeat:-1
		});

		this.anims.create({
			key:'moving',
			frames:this.anims.generateFrameNames('sprite-atlas',{
				start:1,
				end:2,
				suffix:'A.png'
			}),
			frameRate:8,
			repeat:-1
		});

		this.player.anims.play('still');


		Game.createKey(this,'SPACE');
	}

	update(){
		if(Phaser.Input.Keyboard.JustDown(Game.getKey('SPACE'))){
			this.player.anims.play('moving');
		}
		if(Phaser.Input.Keyboard.JustUp(Game.getKey('SPACE'))){
			this.player.anims.play('still');
		}
	}
}