let down = false;
let playerToHigh = false;
let playerToLow = false;
let ps = 0;
let es = 0;

var Obiekt = function (x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
};
Obiekt.prototype.rysuj = function () {
    this.obiektElement = this.img;
    this.obiektElement.css({
        position: "absolute",
        left: this.x,
        top: this.y
    });
    $("body").append(this.obiektElement);
};
Obiekt.prototype.wGure = function () {
    this.y -= 15;
    this.obiektElement.css({
        left: this.x,
        top: this.y
    });
};
Obiekt.prototype.wDul = function () {
    this.y += 15;
    this.obiektElement.css({
        left: this.x,
        top: this.y
    });
};
var Pilka = function(x, y, speed, img)
{
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.vx;
    this.vy;
    this.img = img;
    this.xdir = -1;
    this.ydir = 1;
}
Pilka.prototype.rysuj = function ()
 {
    this.pilkaElement = this.img;
    this.pilkaElement.css({
        position: "absolute",
        left: this.x,
        top: this.y
    });
    $("body").append(this.pilkaElement);
};
Pilka.prototype.start = function()
{
    this.vx = (Math.floor(Math.random() * 5 + 1)) * this.speed;
    this.vy = (Math.floor(Math.random() * 5 + 1)) * this.speed;
    this.x = 930;
    this.y = 450;
}
Pilka.prototype.update = function()
{
    this.y += (this.vy * this.ydir);
    this.x += (this.vx * this.xdir);
    console.log(this.x + ", " + this.y);
    this.pilkaElement.css({
        left: this.x,
        top: this.y
    });
}
Pilka.prototype.checkHit = function()
{
    if(this.y <= 60)
    {
        this.ydir = 1;
        console.log("Hit!");
    }
    if(this.y >= 870)
    {
        this.ydir = -1;
        console.log("Hit!");
    }
    if(this.x <= 230 && (left.y <= this.y && this.y <= left.y+150))
    {
        this.xdir = 1;
        console.log("Hit!");
    }
    if(this.x >= 1670 && (right.y <= this.y && this.y <= right.y+150))
    {
        this.xdir = -1;
        console.log("Hit!");
    }

}
function enemyHitbox()
{
    if(!down)
    {
        right.wGure();
        if(right.y <= 60)
        {
            down = true;
        }
    }
    else
    {
        right.wDul();
        if(right.y >= 740)
        {
            down = false;
        }
    }
}
function playerHitbox()
{
    if(left.y <= 60)
    {
        playerToHigh = true;
    }
    else
    {
        playerToHigh = false;
    }

    if(left.y >= 740)
    {
        playerToLow = true;
    }
    else
    {
        playerToLow = false;
    }
}
function reset()
{
    pilka.start();
}
function wynik()
{
    let score = document.getElementById("score");
    score.innerHTML = ps + " : " + es;
    reset();
}
function checkScore()
{
    if(pilka.x < 200)
    {
        es++;
        wynik();
        console.log(es + " : " + ps);
        pilka.xdir = 1;
    }
    if(pilka.x > 1700)
    {
        ps++;
        wynik();
        console.log(es + " : " + ps);
        pilka.xdir = -1;
    }
}
var left = new Obiekt(200, 450, $('<div id="left" class="paddle"></div>'));
var right = new Obiekt(1700, 450, $('<div id="right" class="paddle"></div>'));
var pilka = new Pilka(930, 450, 5, $('<div id="ball"></div>'));

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case "ArrowUp":
            if(!playerToHigh)
            {
                left.wGure();
            }
            break;
        case "ArrowDown":
            if(!playerToLow)
            {
                left.wDul();
            }
            break;
    }
});

left.rysuj();
right.rysuj();
pilka.rysuj();

pilka.start();

let enemyMove = setInterval(enemyHitbox, 40);
let playerMove = setInterval(playerHitbox, 1);
let pilkaMove = setInterval(function () {pilka.update(); pilka.checkHit();}, 50);
let scoreLoop = setInterval(checkScore, 50);