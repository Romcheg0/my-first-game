var mainArea = document.getElementById("main-area")

var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;

document.addEventListener("keydown", function(){
        if (event.code=='KeyW'){
            wPressed = true;
        }
        if (event.code=='KeyA'){
            aPressed = true;
        }
        if (event.code=='KeyS'){
            sPressed = true;
        }
        if (event.code=='KeyD'){
            dPressed = true;
        }
})

document.addEventListener("keyup", function(){
        if (event.code == "KeyW"){
            wPressed = false;
        }
        if (event.code == "KeyA"){
            aPressed = false;
        }
        if (event.code == "KeyS"){
            sPressed = false;
        }
        if (event.code == "KeyD"){
            dPressed = false;
        }
})

class Entity{
    name = "name";
    health = 100;
    speed = 10;
    damage = 10;
    isTurned = false;

    constructor(name){
        this.name = name;
    }

    moveCheck = setInterval(()=>{
        if (wPressed){
            if(this.object.offsetTop <= mainArea.offsetTop){
                this.object.style.top = mainArea.offsetTop + 'px';
                return;
            }
            else{
                this.object.style.top=parseInt(this.object.offsetTop) - 10 +'px';
            }
        }
    
        if (aPressed){
            if(!this.isTurned){
                this.object.style.transform="rotateY(180deg)";
                this.isTurned = true;
            }
            if(this.object.offsetLeft <= mainArea.offsetLeft){
                this.object.style.left = mainArea.offsetLeft + 'px';
                return;
            }
            else{
                this.object.style.left=parseInt(this.object.offsetLeft) - 10 +'px';
            }
        }
    
        if (sPressed){
            if(parseInt(this.object.offsetTop + this.object.offsetHeight) + 'px' >= parseInt(mainArea.offsetHeight + mainArea.offsetTop) + 'px'){
                return;
            }
            else{
                this.object.style.top=parseInt(this.object.offsetTop) + 10 + 'px';
            }
        }
    
        if (dPressed){
            if(this.isTurned){
                this.object.style.transform="rotateY(360deg)";
                this.isTurned = false;
            }
            if(this.object.offsetLeft >= mainArea.offsetLeft + mainArea.offsetWidth - this.object.offsetWidth){
                this.object.style.left = parseInt(mainArea.offsetLeft + mainArea.offsetWidth - this.object.offsetWidth) + 'px';
            }
            else{
                this.object.style.left = parseInt(this.object.offsetLeft) + 10 + 'px';
            }
        }
    }, 50)
}

class Human extends Entity{
    type = "soldier";
    object = document.createElement("div");

    constructor(name, health, speed, damage, skin = "url(img/soldier2.png)"){
        super(name);
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.skin = skin;
        this.object.style.background = skin;
    }

    spawn(){
        this.object.id = this.type;
        
        mainArea.appendChild(this.object);

        this.object.style.top = parseInt(this.object.offsetHeight*3 + mainArea.offsetTop) + 'px';
        this.object.style.left = parseInt(this.object.offsetWidth*12 + mainArea.offsetLeft) + 'px';
    }

}

let John = new Human("John", 100, 10, 20);
John.spawn();