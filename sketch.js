var Dog, dogImg, happyDog, foodS, foodStock;
var database;

function preload()
{
  dogImg = loadImage( "images/dogImg.png");
  happyDog = loadImage( "images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  Dog = createSprite(250,250,20,80);
  Dog.addImage("dog", dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
   background(46, 139, 87);

   if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     Dog.addImage("happyDog", happyDog);
   }
  drawSprites();
  //add styles here
  textSize(30);
  fill("white");
  noStroke();
  text("Food Stock Left: " + foodStock, 450,20);
  text("Note: Press Up Arrow Key to feed Drago!", 100,20);
  

}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){

  if (x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}
