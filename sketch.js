const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var world;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8;
var boy;
var rock;

function preload(){
	boy=loadImage("images/boy.png");
}

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	treeObj=new tree(1050,580);
	var tPos = {x:treeObj.x, y:treeObj.y};

	mango1 = new Mango(tPos.x-50,tPos.y-480,30);
	mango2 = new Mango(tPos.x+50,tPos.y-500,30);
	mango3 = new Mango(tPos.x+150,tPos.y-360,30);
	mango4 = new Mango(tPos.x+50,tPos.y-380,30);
	mango5 = new Mango(tPos.x-20,tPos.y-410,30);
	mango6 = new Mango(tPos.x-150,tPos.y-400,30);
	mango7 = new Mango(tPos.x-85,tPos.y-360,30);
	mango8 = new Mango(tPos.x+120,tPos.y-430,30);

	groundObject=new ground(width/2,600,width*4,20);

	rock = new Rock(240, 410, 20, {x:240, y:420});
	
	Engine.run(engine);

}

function draw() {

  background(230);
  image(boy,200,340,200,300);
  
  
  treeObj.display();

  mango1.getHit(rock);
  mango2.getHit(rock);
  mango3.getHit(rock);
  mango4.getHit(rock);
  mango5.getHit(rock);
  mango6.getHit(rock);
  mango7.getHit(rock);
  mango8.getHit(rock);

  drawSprites();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();

  rock.constraint.drawLine("black", 2);
  rock.display();
  
  groundObject.display();

  textAlign(CENTER);
  textSize(40);
  if (rock.constraint.bodyReleased)
  {
	  text("Press space to retrieve rock.", width/3, height/5);
  }
  else
  {
	  text("Press r to reset all.", width/3, height/5);
    textSize(25);
	  text("Drag your mouse to aim. Let go to shoot the rock.", width/3, height*(2/5));
  }
}

function resetMangoes()
{
	mango1.resetPosition();
	mango2.resetPosition();
	mango3.resetPosition();
	mango4.resetPosition();
	mango5.resetPosition();
	mango6.resetPosition();
	mango7.resetPosition();
	mango8.resetPosition();
}

function mouseDragged()
{
  if (rock.constraint.bodyReleased)
  {
    return;
  }
  Matter.Body.setPosition(rock.body, {x:mouseX, y:mouseY});
  Matter.Body.setAngularVelocity(rock.body, 0);
  Matter.Body.setAngle(rock.body, 0);
}

function mouseReleased()
{
  if (rock.constraint.bodyReleased)
  {
    return;
  }
  rock.constraint.shootBody();
}

function keyPressed()
{
  //             space
	if (keyCode == 32 && rock.constraint.bodyReleased)
	{
		rock.constraint.resetBody(rock.body);
	}

  //             r
	if (keyCode == 82 && !rock.constraint.bodyReleased)
	{
		resetMangoes();
		rock.constraint.resetBody(rock.body);
	}
}