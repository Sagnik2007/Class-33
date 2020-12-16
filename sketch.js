const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var score=0;
var game_state="attach";
var birds=[];
var flyingBird;
var selectedBird;
var pigSnort;


function preload() {
    changeBackground();
    flyingBird = loadSound("sprites/bird_flying.mp3");
    selectedBird = loadSound("sprites/bird_select.mp3");
    pigSnort = loadSound("sprites/pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 480, 300, 220);

    box1 = new Box(700,520,70,70);
    box2 = new Box(920,520,70,70);
    pig1 = new Pig(810, 550);
    log1 = new Log(810,460,300, PI/2);

    box3 = new Box(700,440,70,70);
    box4 = new Box(920,440,70,70);
    pig2 = new Pig(810, 420);

    log3 =  new Log(810,380,300, PI/2);

    box5 = new Box(810,360,70,70);
    log4 = new Log(760,320,150, PI/7);
    log5 = new Log(870,320,150, -PI/7);

    bird = new Bird(215,200);
    bird1 = new Bird(150,350);
    bird2 = new Bird(100,350);
    bird3 = new Bird(50,350);
    birds.push(bird3)
    birds.push(bird2);
    birds.push(bird1);
    birds.push(bird);

    slingshot = new Slingshot(birds[birds.length - 1].body,{x:215,y:200});
    
}

function draw(){
    if(backgroundImg){
    background(backgroundImg);
    }
    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();
    pig1.score();

    box3.display();
    box4.display();
    pig2.display();
    log3.display();
    pig2.score();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird1.display();
    bird2.display();
    bird3.display();

    platform.display();
    slingshot.display();
    textSize(25);
    fill("red");
    text("Score :" + score,1000,50);
}

    function mouseDragged(){
        if(game_state === "attach"){
        Matter.Body.setPosition(birds[birds.length - 1].body,{x:mouseX,y:mouseY});
        Matter.Body.applyForce(bords[birds.length - 1].body,birds[birds.length - 1].body.position,
        {x:5,y:-5});
        
        selectedBird.play()
        }
    }
    
    function mouseReleased(){
        slingshot.fly();
        game_state = "flying";
        birds.pop()
        flyingBird.play()
    }

function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(birds[birds.length - 1].body,{x:200,y:50});
        slingshot.attach(birds[birds.length - 1].body);
        game_state = "attach";
        bird.trajectory = [];
        bird1.trajectory = [];
        bird2.trajectory = [];
        bird3.trajectory = [];
        selectedBird.play()
    }

}
async function changeBackground(){
    var wapi = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var wapiJson = await wapi.json();
    var wapiJsonDatetime = wapiJson.datetime;
    var hour = wapiJsonDatetime.slice(11,13);
    console.log(hour);
    if(hour > 6 && hour < 16){
        bg = "sprites/bg.png"
    }
    else{
        bg = "sprites/bg2.jpg"
    }

    backgroundImg = loadImage(bg);
}