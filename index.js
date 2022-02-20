var mainMenu = document.getElementById("main-menu");
var startForm = document.getElementById("start-form");
var loginButton = document.getElementById("login");
var registerButton = document.getElementById("register");
var registerForm = document.getElementById("register-form");
var registerTable = document.getElementById("register-table");
var loginForm = document.getElementById("login-form");
var loginTable = document.getElementById("login-table");
var gameInfo;
var nameInfo;
var healthInfo;
var ammoMagInfo;
var ammoInfo;
var fragsInfo;
var warningInfo;
var mainArea = document.getElementById("main-area");

var User = {
    nickname: "",
    email: "",
    password: "",
    score: 0
}

mainMenu.style.left = parseInt(mainArea.offsetLeft + mainArea.offsetWidth/2 - mainMenu.offsetWidth/2) + 'px';
mainMenu.style.top = parseInt(mainArea.offsetTop + mainArea.offsetHeight/2 - mainMenu.offsetHeight/2) + 'px';

registerButton.addEventListener("click", showRegister);
loginButton.addEventListener("click", showLogin);

var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;
var spacePressed = false;
var rPressed = false;




document.addEventListener("keydown", function(){
        if (event.code =='KeyW'){
            wPressed = true;
        }
        if (event.code =='KeyA'){
            aPressed = true;
        }
        if (event.code =='KeyS'){
            sPressed = true;
        }
        if (event.code =='KeyD'){
            dPressed = true;
        }
        if (event.code =='Space'){
            spacePressed = true;
        }
        if (event.code == 'KeyR') {
            rPressed = true;
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
        if (event.code=='Space'){
            spacePressed = false;
        }
        if (event.code == "KeyR"){
            rPressed = false;
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

        if (spacePressed){
            this.shoot();
        }
        if (rPressed){
            if(this.ammo > 0){
                if(this.ammoMag < 30){
                    this.reload();    
                }
            }
            else{
                warningInfo.textContent = "No ammo!";
            }
            
        }
    }, 50)
    }
}

class Human extends Entity{
    type = "human";
    object = document.createElement("div");
    ammoMag = 30;
    ammo = 100;
    isReadyToShoot = true;
    user = undefined;

    constructor(name, health, ammoMag, ammo, speed, damage, skin = "url(img/soldier2.png)"){
        super(name);
        this.health = health;
        this.ammoMag = ammoMag;
        this.ammo = ammo;
        this.speed = speed;
        this.damage = damage;
        this.skin = skin;
        this.object.style.background = skin;

        if(document.getElementById("game-info")){
            nameInfo.textContent = name;
            healthInfo.textContent = this.health;
            ammoMagInfo.textContent = this.ammoMag;
            ammoInfo.textContent = this.ammo;
        }
    }



    spawn(){
        this.object = document.createElement("div");
        this.object.style.background=this.skin;
        this.object.id = this.type;
        if(this.isTurned){
            this.object.style.transform="rotateY(180deg)";
        }
        mainArea.appendChild(this.object);
        
        this.object.style.top = parseInt(this.object.offsetHeight*3 + mainArea.offsetTop) + 'px';
        this.object.style.left = parseInt(this.object.offsetWidth*12 + mainArea.offsetLeft) + 'px';

        this.isReadyToShoot=true;
        this.moving();
        spawner();
    }
    shoot(){
        if(warningInfo.textContent == "Reloading..."){
            return;
        }
        if(this.ammoMag > 0 && this.isReadyToShoot){
            this.isReadyToShoot = false;
            setTimeout(() => {
                this.isReadyToShoot = true;
            }, 90);

            var bullet = new Bullet();

            var typeOfVoice = Math.floor(1 + Math.random() * 3);
            
            switch(typeOfVoice){
                case 1:
                    var shotVoice = document.createElement("audio");
                    shotVoice.src="audio/rifle-shot1.wav";
                    shotVoice.autoplay = true;
                    setTimeout(() => {
                        var shellVoice = document.createElement("audio");
                        shellVoice.src="audio/rifle-shell1.wav";
                        shellVoice.autoplay = true;
                    }, 500);
                    break;
                case 2:
                    var shotVoice = document.createElement("audio");
                    shotVoice.src="audio/rifle-shot2.wav";
                    shotVoice.autoplay = true;
                    setTimeout(() => {
                        var shellVoice = document.createElement("audio");
                        shellVoice.src="audio/rifle-shell2.wav";
                        shellVoice.autoplay = true;
                    }, 500);
                    break;
                case 3:
                    var shotVoice = document.createElement("audio");
                    shotVoice.src="audio/rifle-shot3.wav";
                    shotVoice.autoplay = true;
                    setTimeout(() => {
                        var shellVoice = document.createElement("audio");
                        shellVoice.src="audio/rifle-shell3.wav";
                        shellVoice.autoplay = true;
                    }, 500);
                    break;
            }

            var shotVoice = document.createElement("audio");
            shotVoice.src="audio/rifle-shot2.wav";
            shotVoice.autoplay = true;
            setTimeout(() => {
                var shellVoice = document.createElement("audio");
                shellVoice.src="audio/rifle-shell2.wav";
                shellVoice.autoplay = true;
            }, 500);
        
            mainArea.appendChild(bullet.object);
            bullet.object.style.left = parseInt(this.object.offsetLeft + this.object.offsetWidth) + 'px';
            bullet.object.style.top = parseInt(this.object.offsetTop + this.object.offsetHeight*0.55) + 'px';

            if(!this.isTurned){
                bullet.object.style.transform = "rotateY(180deg)";
                var trace = setInterval(()=>{
                    bullet.object.style.left = parseInt(bullet.object.offsetLeft + bullet.speed) + 'px';
                    if(parseInt(bullet.object.offsetLeft+bullet.object.offsetWidth) >= parseInt(mainArea.offsetLeft + mainArea.offsetWidth)){
                        mainArea.removeChild(bullet.object);
                    }
                }, 50)

                trace;
            }
            else{
                bullet.object.style.left = parseInt(bullet.object.offsetLeft - this.object.offsetWidth) + 'px';
                var trace = setInterval(()=>{
                    bullet.object.style.left = parseInt(bullet.object.offsetLeft - bullet.speed) + 'px';
                    if(parseInt(bullet.object.offsetLeft) <= parseInt(mainArea.offsetLeft)){
                        if(mainArea.contains(bullet.object)){
                            mainArea.removeChild(bullet.object);
                        }
                    }
                }, 50)

                trace;
            }
            this.ammoMag--;
            ammoMagInfo.textContent = this.ammoMag;//////////////////////////////////////////////////////
        }
        else{
            if(this.ammoMag==0){
                warningInfo.textContent=`'R' - Reload`;
            }
        }
        
    }
    reload(){
        if(warningInfo.textContent == "Reloading..."){
            return;
        }
        warningInfo.textContent = "Reloading...";
        var timing;
        if(this.ammoMag == 0){
            var reloadVoice = document.createElement("audio");
            reloadVoice.src="audio/rifle-reload-emp.wav";
            reloadVoice.autoplay=true;
            timing = 2500;
        }
        else{
            var reloadVoice = document.createElement("audio");
            reloadVoice.src="audio/rifle-reload-nemp.wav";
            reloadVoice.autoplay=true;
            timing = 1800;
        }

        setTimeout(() => {
            warningInfo.textContent = "";
            var amount = parseInt(30 - this.ammoMag);
            if(this.ammo > amount){
                this.ammo -= amount;
                ammoInfo.textContent = this.ammo;
                this.ammoMag += amount;
                ammoMagInfo.textContent = this.ammoMag;
            }
            else{
                this.ammoMag += this.ammo;
                this.ammo = 0;
                ammoMagInfo.textContent = this.ammoMag;
                ammoInfo.textContent = 0;
            }
        }, timing);
        
    }

}

class Zombie extends Entity{
    type = "zombie";
    object = document.createElement("div");
    target = "";
    readyToBite = true;
    isDead = false;


    constructor(name, health, speed, damage, target, skin = "url(img/zombie2.png)"){
        super(name);
        this.health=health;
        this.speed=speed;
        this.damage=damage;
        this.target=target;
        this.target.object=document.getElementById("human");
        this.skin=skin;
        this.object.style.background=skin;
    }

    spawn(){
        this.object.className = this.type;
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
            if(!this.target || !this.object || this.target.health <= 0){
                clearInterval(moveCheck);
                return;
            }
            var biteReadyX = false;
            var biteReadyY = false;
            
            if (this.target.object.offsetLeft > this.object.offsetLeft){
                if(this.target.object.offsetLeft - this.object.offsetLeft <=20){
                    biteReadyX = true;

                }
                if(this.target.object.offsetLeft - this.object.offsetLeft <=20){
                    
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
                if(this.object.offsetLeft - this.target.object.offsetLeft <=20){
                    biteReadyX = true;
                }
                if(this.object.offsetLeft - this.target.object.offsetLeft <=20){

                }
                else{
                    this.object.style.left = parseInt(this.object.offsetLeft - this.speed) + "px";
                }
                if(!this.object.isTurned){
                    this.object.style.transform="rotateY(180deg)";
                    this.object.isTurned = true;
                }
            }
            if(this.target.object.offsetTop > this.object.offsetTop){
                if(this.target.object.offsetTop + this.target.object.offsetHeight - this.object.offsetTop <=30){
                    biteReadyY = true;
                }
                else{
                    this.object.style.top = parseInt(this.object.offsetTop + this.speed) + "px";
                }
            }
            else{
                if(this.object.offsetTop - this.target.object.offsetTop <=30){
                    biteReadyY = true;
                }
                else{
                    this.object.style.top = parseInt(this.object.offsetTop - this.speed) + "px";
                }
            }
            /*================Biting interval================*/
            if(this.readyToBite && biteReadyX && biteReadyY){
                    this.bite();
                    this.readyToBite = false;
                    setTimeout(() => {
                        this.readyToBite = true; 
                     }, 1500);
                }
            
            /*======Bullet hit check========================*/
            if(!this.isDead){
                for(var i = 0; i < document.getElementsByClassName("bullet").length; i++){
                    if((this.object.offsetLeft <= document.getElementsByClassName("bullet")[i].offsetLeft) &&
                    (document.getElementsByClassName("bullet")[i].offsetLeft <= parseInt(this.object.offsetLeft + this.object.offsetWidth)) &&
                    (this.object.offsetTop <= document.getElementsByClassName("bullet")[i].offsetTop) &&
                    (document.getElementsByClassName("bullet")[i].offsetTop <= parseInt(this.object.offsetTop + this.object.offsetHeight))){
                            mainArea.removeChild(document.getElementsByClassName("bullet")[i]);
                            this.health -= this.target.damage;
                            if(this.health <= 0){
                                this.speed = 0;
                                this.damage = 0;
                                this.isDead = true;
                                if(this.isTurned){
                                    this.object.animate([
                                        {opacity: 1},
                                        {transform:"rotateZ(90deg)", opacity: 1},
                                        {transform:"rotateZ(90deg)", opacity: 0}
                                    ], 2000)
                                }
                                else{
                                    this.object.animate([
                                        {opacity: 1},
                                        {transform:"rotateZ(-90deg)", opacity: 1},
                                        {transform:"rotateZ(-90deg)", opacity: 0}
                                    ], 2000)
                                }
                                setTimeout(() => {
                                    fragsInfo.textContent = parseInt(fragsInfo.textContent) + 1;
                                    if(mainArea.contains(this.object)){
                                        mainArea.removeChild(this.object);
                                    }
                                }, 2000);
                                
                            }
                    }
                }
            }
            /*===================*/
        }       
        , 50)
    }
    bite(){                        
        this.target.health -= this.damage;
        healthInfo.textContent = this.target.health;
        if(this.target.health <= 0){                    //endgame!
            endGame();
        }
        
    }
}

class Bullet{
    object = document.createElement("div");
    speed = 30;
    constructor(speed = 30){
        this.speed = speed;
        this.object.className="bullet";
    }
}

function showRegister(){
    startForm.style.display="none";
    document.getElementById("register-info").style.display="none";
    registerForm.style.display="block";

    registerForm.addEventListener("submit", ()=>{
        document.getElementById("register-info").style.display="none";

        event.preventDefault();
        
        var name = registerForm.getElementsByTagName("input")[0].value;
        var email = registerForm.getElementsByTagName("input")[1].value;
        var pass = registerForm.getElementsByTagName("input")[2].value;

        document.getElementById("register-info").style.display="block";

        if(!(/^\w{6,18}$/.test(pass))){
            document.getElementById("register-info").textContent="Invalid password";
            return;
        }

        User = {nickname: name, email: email, password: pass, score: 0};
        var JUser = JSON.stringify(User);

        

        if(validateRegister(email)){
            localStorage.setItem(email, JUser);
            document.getElementById("register-info").textContent="Success";

            showStartForm(2000);
            return;
        }
        else{
            document.getElementById("register-info").textContent="This email is already used";
            return;
        }
    })
    registerForm.getElementsByTagName("a")[0].addEventListener("click", ()=>showStartForm(0));
}
function showLogin(){
    console.log(localStorage);
    startForm.style.display="none";
    document.getElementById("login-info").style.display="none";
    loginForm.style.display="block";

    loginForm.addEventListener("submit", ()=>{
        document.getElementById("login-info").style.display="none";

        event.preventDefault();
        
        var email = loginForm.getElementsByTagName("input")[0].value;
        var pass = loginForm.getElementsByTagName("input")[1].value;

        document.getElementById("login-info").style.display="block";
        
        if(localStorage.getItem(email)){
            console.log(JSON.parse(localStorage.getItem(email)).password);
            console.log(pass);
            if(JSON.parse(localStorage.getItem(email)).password == pass){
                document.getElementById("login-info").textContent="Success";

                if(document.getElementById("logoutd")){
                    document.getElementById("logoutd").id="logout";
                }
                if(document.getElementById("playd")){
                    document.getElementById("playd").id="play";
                }

                document.getElementById("logout").addEventListener("click", ()=>{
                    document.getElementById("player-info").textContent="";
                    document.getElementById("logout").id="logoutd";
                document.getElementById("play").id="playd";
                })

                document.getElementById("play").addEventListener("click", ()=>{
                    startGame(JSON.parse(localStorage.getItem(email)))
                });

                document.getElementById("player-info").textContent=JSON.parse(localStorage.getItem(email)).nickname + " | High score: " + JSON.parse(localStorage.getItem(email)).score;

                showStartForm(2000);
            }
            else{
                document.getElementById("login-info").textContent="Invalid password";
            }
        }
        else{
            document.getElementById("login-info").textContent="Invalid email";

        }
    })
    loginForm.getElementsByTagName("a")[0].addEventListener("click", ()=>showStartForm(0));
}

function validateRegister(e){
    for(i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == e){
            return false;
        }
    }
    return true;
}

function showStartForm(t){
    setTimeout(() => {
        startForm.style.display="flex";
        registerForm.style.display="none";
        loginForm.style.display="none";
    }, t);
}

var Hero = new Human("Human", 100, 30, 3000, 10, 10)

function startGame(p){
    var max_id = setInterval(function () {});
    while (max_id--) {
    clearInterval(max_id);
}
    mainMenu.style.display="none";
    mainArea.style.opacity="1";
    mainArea.style.width="95vw";

    

    Hero.name= p.nickname;
    Hero.health = 100;
    Hero.ammoMag = 30;
    Hero.ammo = 3000;
    Hero.user = p;
    setTimeout(() => {
        mainArea.innerHTML =`
            <div id="game-info">
                <table>
                    <caption>Player</caption>
                    <tr>
                        <td>Health:</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Ammo:</td>
                        <td>000</td>
                        <td>/</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Frags:</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                    </tr>
                </table>
        `;
        gameInfo = document.getElementById("game-info");
        nameInfo = gameInfo.getElementsByTagName("caption")[0];
        healthInfo = gameInfo.getElementsByTagName("td")[1];
        ammoMagInfo = gameInfo.getElementsByTagName("td")[3];
        ammoInfo = gameInfo.getElementsByTagName("td")[5]
        fragsInfo = gameInfo.getElementsByTagName("td")[7];
        warningInfo = gameInfo.getElementsByTagName("td")[8];

        gameInfo.style.left=(mainArea.offsetLeft+mainArea.offsetWidth-gameInfo.offsetWidth) + "px";
        gameInfo.style.top=(mainArea.offsetTop)+"px";

        Hero.spawn();


        nameInfo.textContent=p.nickname;
        healthInfo.textContent=Hero.health;
        ammoMagInfo.textContent=Hero.ammoMag;
        ammoInfo.textContent=Hero.ammo;
        fragsInfo.textContent=0;
        warningInfo.textContent="";
    }, 2000);
}
function endGame(){
    if(document.getElementById("human")){
        mainArea.removeChild(document.getElementById("human"));
    }
    mainArea.innerHTML =``;
    mainArea.style.width="0";
    mainMenu.style.opacity="0";
    mainMenu.style.display="block";
    mainMenu.style.opacity="1";

    if(parseInt(Hero.user.score) < parseInt(fragsInfo.textContent)){
        Hero.user.score = parseInt(fragsInfo.textContent);
    }
    localStorage.setItem(Hero.user.email, JSON.stringify(Hero.user));

    var max_id = setInterval(function () {});
    while (max_id--) {
        clearInterval(max_id);
    }
}

function spawner(){
    var i = 0;
    var spawnInterval = setInterval(() => {
        let z = new Zombie("simplezomb", 100, 5, 100, Hero);
        if(!(Hero.health <= 0)){
            z.spawn();
        }
    }, 3000);

    spawnInterval;
}