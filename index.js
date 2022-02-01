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

    moving(){
        var moveCheck = setInterval(()=>{
        if (wPressed){
            if(this.object.offsetTop <= mainArea.offsetTop){
                this.object.style.top = mainArea.offsetTop + 'px';
                return;
            }
            else{
                this.object.style.top=parseInt(this.object.offsetTop) - this.speed +'px';
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
                this.object.style.left=parseInt(this.object.offsetLeft) - this.speed +'px';
            }
        }
    
        if (sPressed){
            if(parseInt(this.object.offsetTop + this.object.offsetHeight) + 'px' >= parseInt(mainArea.offsetHeight + mainArea.offsetTop - 15) + 'px'){
                this.object.style.top = parseInt(mainArea.offsetHeight + mainArea.offsetTop - this.object.offsetHeight - 15) + 'px';
                return;
            }
            else{
                this.object.style.top=parseInt(this.object.offsetTop) + this.speed + 'px';
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
                this.object.style.left = parseInt(this.object.offsetLeft) + this.speed + 'px';
            }
        }
    }, 50)
    }
}

class Human extends Entity{
    type = "human";
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
        this.moving();
    }

}

class Zombie extends Entity{
    type = "zombie";
    object = document.createElement("div");
    target = "";


    constructor(name, health, speed, damage, skin = "url(img/zombie2.png)"){
        super(name);
        this.health=health;
        this.speed=speed;
        this.damage=damage;
        this.skin=skin;
        this.object.style.background=skin;
    }

    spawn(){
        this.object.className = this.type;
        this.target=document.getElementById("human");
        mainArea.appendChild(this.object);

        var sides = new Array("left", "right");
        var side = sides[Math.floor(Math.random() * 2)];
        if(side == "left"){
            this.object.style.transform="rotateY(360deg)";
            this.object.style.left = parseInt(mainArea.offsetLeft) + 'px';
            this.object.style.top = parseInt(Math.random() * (90-10) + 10) + '%';

            if(this.object.offsetTop <= mainArea.offsetTop){
                this.object.style.top = mainArea.offsetTop + 'px';
            }
            if(parseInt(this.object.offsetTop + this.object.offsetHeight) + 'px' >= parseInt(mainArea.offsetHeight + mainArea.offsetTop) + 'px'){
                this.object.style.top = parseInt(mainArea.offsetHeight + mainArea.offsetTop - this.object.offsetHeight) + 'px';
            }
        }
        else{
            this.object.style.transform="rotateY(180deg)";
            this.object.style.left = parseInt(mainArea.offsetLeft + mainArea.offsetWidth - this.object.offsetWidth) + 'px';
            this.object.style.top = parseInt(Math.random() * (90-10) + 10) + '%';

            if(this.object.offsetTop <= mainArea.offsetTop){
                this.object.style.top = mainArea.offsetTop + 'px';
            }
            if(parseInt(this.object.offsetTop + this.object.offsetHeight) + 'px' >= parseInt(mainArea.offsetHeight + mainArea.offsetTop) + 'px'){
                this.object.style.top = parseInt(mainArea.offsetHeight + mainArea.offsetTop - this.object.offsetHeight) + 'px';
            }


        }
        this.moving();
    }

    moving(){
        var moveCheck = setInterval(()=>{
            
            if (this.target.offsetLeft > this.object.offsetLeft){
                if(this.target.offsetLeft - this.object.offsetLeft <=30){
                    
                }
                else{
                    this.object.style.left = parseInt(this.object.offsetLeft + this.speed) + "px";
                }

                if(this.object.isTurned){
                    this.object.style.transform="rotateY(360deg)";
                    this.object.isTurned = false;
                }
            }
            else{
                if(this.object.offsetLeft - this.target.offsetLeft <=30){
                    
                }
                else{
                    this.object.style.left = parseInt(this.object.offsetLeft - this.speed) + "px";
                }
                if(!this.object.isTurned){
                    this.object.style.transform="rotateY(180deg)";
                    this.object.isTurned = true;
                }
            }
            if(this.target.offsetTop > this.object.offsetTop){
                if(this.target.offsetTop + this.target.offsetHeight - this.object.offsetTop <=10){
                    return;
                }
                this.object.style.top = parseInt(this.object.offsetTop + this.speed) + "px";
            }
            else{
                if(this.object.offsetTop - this.target.offsetTop <=10){
                    return;
                }
                this.object.style.top = parseInt(this.object.offsetTop - this.speed) + "px";
            }
        }, 50)
    }
}

let Bill = new Human("Bill", 100, 10, 20)
Bill.spawn();
let John = new Zombie("John", 100, 5, 20);
John.spawn();
