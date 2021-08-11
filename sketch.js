
var ground,groundImage;
var cat,catImage;
var IVground,IVgroundImage;
var emy,emyImage;
var cloud,cloudImage;
var coin,coinImage;
var bullet,bulletImage;
var cute, cuteImage;
var soldier, soldierImage,



var logImage;
var score = 0
var life = 5
var restart, restartImage;
var gameOver, gameOverImage;


var PLAY = 1
var END = 0
var gameState = PLAY


function preload() {

groundImage = loadImage("ground.png")
soldierImage = loadAnimation("cat1.png","cat2.png","cat3.png","cat4.png","cat5.png","cat6.png")
emyImage = loadImage("enemy.png")
logImage = loadImage("log.png")
cloudImage = loadImage("cloud.png")
coinImage = loadImage("coin.png")

gameOverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")
catDeadImage = loadImage("catDead.png")

}


function setup() {
createCanvas(windowWidth, windowHeight);


ground = createSprite(width/2,height,width,20)
ground.addImage("ground",groundImage)
ground.x = ground.width/2

//soldier = createSprite(50,height-70,20,20)
//soldier.addAnimation(soldierImage)
//soldier.scale = 0.6


IVground = createSprite(width/2,height-10,width,10)
IVground.visible = false


restart = createSprite(width/2,height/2-100)
restart.addImage("restart",restartImage)
restart.scale = 0.4
restart.visible = false

coin = createSprite(200,50,10,10)
coin.addImage("coin",coinImage)


logGroup = new Group()
cloudGroup = new Group()
bulletGroup = new Group()
emyGroup = new Group()
coinGroup = new Group()
cuteGroup = new Group()


score = 0

}


function draw() {
  background("pink")
  
  fill("white")
  textSize(35)
  textFont("monospace")
  text("Score   :"+score,70,60)
 
 
  text("Life  :"+life,330,60)
  
  drawSprites();

if(gameState===PLAY){
   
  restart.visible = false
  //gameOver.visible = false
  background.velocityX = -3
    
  if(background.x<0){
  background.x = background.width/2
 }

   ground.velocityX = -7
    
    if(ground.x<500){
    ground.x = ground.width/2
   }

   if(keyDown("space")){
    soldier.velocityY = -20
   
   }

  
   soldier.velocityY = soldier.velocityY +0.8

    spawnlog();
    spawnemy();
    spawnclouds();
    spawncoins();
    spawncute();

    
  if(logGroup.isTouching(soldier)){
    life = life-1
    gameState = END
   
  }

  if(emyGroup.isTouching(soldier)){
    life = life-1
    
    soldier.changeAnimation("soldier",soldierDeadImage)
    gameState = END
  }

  if(bulletGroup.isTouching(emyGroup)){
    emyGroup.destroyEach()
    bulletGroup.destroyEach()

  }

  
     if(coinGroup.isTouching(soldier)){
       score = score+1
      coinGroup[0].destroy()
      
       }

     
 
  ground.velocityX = 0
  
  emyGroup.setVelocityXEach(0)
  logGroup.setVelocityXEach(0)
  cloudGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)

  cloudGroup.setLifetimeEach(-1)
  coinGroup.setLifetimeEach(-1)
  logGroup.setLifetimeEach(-1)
  emyGroup.destroyEach();

  
  cat.collide(IVground)
 
}
}

function spawnlog() {
  //write code here to spawn the pipe
  if (frameCount % 350 === 0) {
    var log = createSprite(width,height-70,40,10);
    log.addImage(logImage);
    log.scale = 1;
    log.velocityX = -6;
    logGroup.add(log)
  }
}

function spawnemy() {
  
  if (frameCount % 150 === 0) {
    var emy = createSprite(width,height-70,40,10);
    emy.addAnimation("emy",emyImage);
    emy.scale = 0.6;
    emy.velocityX = -7;
    emyGroup.add(emy)
  }
}



function spawnclouds() {
 
  if (frameCount % 100 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(80,190));
    cloud.addImage(cloudImage);
    cloud.scale = 3;
    cloud.velocityX = -3;
    cloudGroup.add(cloud)

  }
}

function spawncute() {
 
  if (frameCount % 100 === 0) {
    var cute = createSprite(width,random(50,150),40,10);
    cute.addAnimation("cute",cuteImage);
    cute.scale = 0.2;
    cute.velocityX = -7;
    cuteGroup.add(cute)
   
    
  }
}

