//Global Variables
var monkey, monkey_running;
var backImage,background;
var bananaGroup, stoneGroup;
var bananaImage, stoneImage;

var score;
var gameOver, restart;

function preload(){
  backImage = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  stoneImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(800,400);
  
  background = createSprite(0,0,800,400);
  background.addImage(backImage);
  background.scale = 1.5;
  background.x = background.width/2;
  background.velocityX = -4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.5;

  
  ground = createSprite(400,350,800,10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  ground.visible = false;
  
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  gameOver = createSprite(310,50,20,20);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(310,100,20,20);
  restart.addImage("restart", restartImage);
restart.visible = false;
  
  score = 0;
}

function draw(){
 background(255); 
  
  if(ground.x<0){
      ground.x = ground.width/2;
  }
  
  if(background.x<100){
      background.x = background.width/2;
  }
  
  if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
    score = score + 1;
  }
  
  if(keyDown("space")){
  monkey.velocityY = -12;
  }
 monkey.velocityY = monkey.velocityY + 0.8;
    
  monkey.collide(ground);
  spawnBananas();
  spawnStones();
  
  if(stonesGroup.isTouching(player)){
      gameOver.visible = true;
    restart.visible = true;
    stoneGroup.velcocityX = 0;
    bananaGroup.velocityX = 0;
    monkey.velocityY = 0
    ground.velocityX = 0;
    background.velocityX = 0;
  }
  
  drawSprites();
  
  stroke("white")
  textSize(25);
  text("Score: " + score, 500,50);
}

function reset() {
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  ground.velocityX = -3;
  gameOver.visible = false;
  restart.visible = false;
  count = 0;
}

function spawnBananas() {
  if(frameCount % 60 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.lifetime = 300;
    
    monkey.depth = banana.depth + 1;
    
    bananaGroup.add(banana);
  }
}
function spawnStones() {
  if(frameCount % 80 === 0){
    var stone = createSprite(800,350,10,40);
    stone.velocityX = -8;
    stone.addImage(stoneImage);
    stone.lifetime = 300;
    
    stonesGroup.add(stone);
  }
}