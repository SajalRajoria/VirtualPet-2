//Create variables here
var  dog, happyDog, database;
var foodS;
var frame;
var foodObj;
var fedTime,lastFed;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  foodObj = new Food();
  
  foodObj.getFoodStock();
  foodObj.updateFoodStock();
  foodObj.deductFood();



  dog = createSprite(250,250,10,10);
  dog.scale = 0.4
  dog.addImage(dogImg);

  frame = createSprite(250,490,500,10);
  frame.shapeColor = "yellow";
  frame1 = createSprite(250,10,500,10);
  frame1.shapeColor = "yellow";

  frame2 = createSprite(10,250,10,500);
  frame2.shapeColor = "yellow";

  frame3 = createSprite(490,250,10,500);
  frame3.shapeColor = "yellow";

  feed = createButton("Feed the dog");
   feed.position(700,95);
   feed.mousePressed(feedDog());

   addFood=createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods());

}


function draw() {  
background(46, 139, 87);
foodObj.display();
/*
if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(happyDog);
}
*/

  drawSprites();
  //add styles here
   textSize(15);
   
   fill("white");
   text("Press UP_ARROW key  to feed milk ",130,70);

  if(lastFed >= 12){
    text("Last Feed : " + lastFed%12 + "PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : " + lastFed + "AM",350,30);
  }

   fedTime = database.ref('FeedTime');
   fedTime.on("value",function(data){
   lastFed = data.val();
   })

   

}

// function to update food stock and last time
function feedDog(){
  dog.addImage(happyDog);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    feedTime : hour()
  })
}

// function to add foodin stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}



