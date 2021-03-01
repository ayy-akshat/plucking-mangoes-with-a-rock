class Rock
{
	constructor(x,y,r,handPos)
	{
		var options={
			isStatic: false,
			restitution: 0,
            friction: 0.9,
            density: 4
			}
		this.x=x;
		this.y=y;
		this.r=r;
		this.image=loadImage("images/stone.png");
		this.body=Bodies.circle(this.x, this.y, this.r, options);
		World.add(world, this.body);
        this.constraint = new Slingshot(this.body, 20, 0.005, {x:0, y:0}, {x:handPos.x, y:handPos.y});
        this.sprite = createSprite(this.x, this.y, this.r*3, this.r*3);
		this.sprite.visible = false;
	}

	display()
	{
        this.sprite.x = this.body.position.x;
		this.sprite.y = this.body.position.y;
		var pos = this.body.position;
		push();
		translate(pos.x, pos.y);
		rotate(180*this.body.angle/PI);
		imageMode(CENTER);
		image(this.image, 0,0,this.r*2, this.r*2);
		pop();
 }
}