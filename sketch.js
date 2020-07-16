//Global Variables
var monkey,monkeyanim;
var jungle,jungleimg;
var banana, bananaimg; 
var rock,stoneimg;
var ground;
var gamestate,score;

function preload(){
  monkeyanim = loadAnimation('Monkey_01.png','Monkey_02.png','Monkey_03.png','Monkey_04.png','Monkey_05.png','Monkey_06.png','Monkey_07.png','Monkey_08.png','Monkey_09.png','Monkey_10.png');
  bananaimg = loadImage('Banana.png');
  stoneimg = loadImage('stone.png');
  jungleimg = loadImage('jungle.jpg');
}


function setup() {
    jungle = createSprite(300,100);
  jungle.addImage("bg",jungleimg);
  createCanvas(600,300);
  monkey = createSprite(56,260);
  monkey.addAnimation("running",monkeyanim);
  monkey.scale = 0.1;
  
  ground = createSprite (300,295,600,10);
  ground.visible = false;
  jungle.velocityX = -4;
 jungle.scale = 1.2;

  banana = createSprite(690,390);
  rock = createSprite(690,390);
  gamestate = 1;
  score = 0;
}


function draw(){
  monkey.velocityY = monkey.velocityY + 0.8;
 background(255); 
  monkey.collide(ground);
if (gamestate === 1){
  bananamakiman();
  rockspawn();
  
    
   if (jungle.x <5){
   jungle.x = jungle.width/2;
   }
if (keyDown("space")){
    //monkeyjump
  monkey.velocityY = -3;
    }
  if (monkey.isTouching(banana)){
    banana.destroy();  
    score = score + 5;
    if (monkey.scale <= 0.175 ){
      monkey.scale = monkey.scale+0.0125;
    }
  } 
  
  if (monkey.isTouching(rock)){
    rock.lifetime = -1;
    banana.lifetime = -1;
    rock.velocityX = 0;
    jungle.velocityX = 0; 
    banana.velocityX = 0;
    gamestate = -1;
    } 
   }
  if (gamestate === -1){
      rock.lifetime = -1;
    banana.lifetime = -1;
    rock.velocityY = 0;
    jungle.velocityX = 0;
    banana.velocityX = 0;
   monkey.pause();
    textSize(21);
    text("r to restart",300,75);
    
    if (keyDown("r")){
     score = 0;
      monkey.scale = 0.1;
      rock.destroy();
      banana.destroy();
      jungle.x = jungle.width/2;
      monkey.play();
      jungle.velocityX = -4;
      gamestate = 1;
    }
   
  }
 


  
  
  drawSprites();
  textSize(21);
  text ("score: "+score,15,15);
}

function rockspawn(){
if (World.frameCount%180 === 0){
rock = createSprite(635,270);
rock.scale = 0.15;
rock.addImage("Stone",stoneimg);
rock.velocityX = -4;
rock.depth = monkey.depth;
rock.lifetime = 171;
}
}

function bananamakiman(){
  if (World.frameCount%80===0){
banana = createSprite(600,random(415,210));
    banana.depth = monkey.depth;
banana.addImage("Banana",bananaimg);
banana.scale = 0.05;
banana.velocityX = -8;
banana.lifetime = 171;
  }
}