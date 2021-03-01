class Mango
{
	constructor(x,y,r)
	{
		var options={
			restitution: 0,
            friction: 0.9,
			density: 0.5
		};
		this.still = true;
		this.x=x;
		this.y=y;
		this.r=r;
		this.image=loadImage("images/mango.png");
		this.body=Bodies.circle(this.x, this.y, this.r, options);
		World.add(world, this.body);
		this.sprite = createSprite(this.x, this.y, this.r*2.5, this.r*2.5);
		this.sprite.visible = false;
	}

	display()
	{
		this.sprite.x = this.body.position.x;
		this.sprite.y = this.body.position.y;
		var mangoPos=this.body.position;	
		push()
		translate(mangoPos.x, mangoPos.y);
		rotate(180*this.body.angle/PI);
		imageMode(CENTER);
		image(this.image, 0,0,this.r*2, this.r*2);
		pop();

		if (this.still)
		{
			Matter.Body.setVelocity(this.body, {x:0, y:0});
			Matter.Body.setPosition(this.body, {x:this.x, y:this.y});
		}
	}
	
	getHit(obstacle)
	{
		if (obstacle.sprite.isTouching(this.sprite))
		{
			this.still = false;
		}
	}

	resetPosition()
	{
		this.still = true;
		Matter.Body.setPosition(this.body, {x:this.x, y:this.y});
		Matter.Body.setAngle(this.body, 0);
		Matter.Body.setAngularVelocity(this.body, 0);
	}
}