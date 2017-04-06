var ball_diameter = 20;
var bomb_diameter = 10;
var zapperwidth = 6;
var xpoint;
var ypoint;
var numbofbombs = 10;
var bombposX = [];
var bombposY = [];
var bombacel = [];
var bombvel = [];
var time = 0;
var timeperiod = 0;
var posX;
var score = 0;

function setup() {
    createCanvas(680, 480);
    var temp00 = 0,
        temp01 = -20;

    while (temp01 < height) {
        temp00 += 0.02;
        temp01 += temp00;
        timeperiod++;
        message = "here are a few more"
    }

    posX = zapperwidth + 0.5 * ball_diameter - 2
    xpoint = 0.5 + width;
    ypoint = height - 0.5 * ball_diameter + 1

    initBombs()

}

function draw() {
    background(0);
    fill(255, 12, 12);
    rect(0, 0, zapperwidth, height);

    ellipse(xpoint, ypoint, ball_diameter, ball_diameter)
    xpoint -= 4;

    for (var i = 0; i < numbofbombs; i++) {
        fill(0, 255, 0);
        ellipse(bombposX[i], bombposY[i], bomb_diameter, bomb_diameter)
    }
    updateBombPos()

    if (mouseIsPressed && (xpoint + ball_diameter < width)) {
        xpoint += 8
    }

    if (xpoint < posX || bombCollision()) {
        gameover();
    }
    time++;
    scoreUpdate()
}

function gameover() {
    fill(255);
    text("GAME OVER", .5 * width, .5 * height)
    noLoop()
}

function updateBombPos() {
    for (var i = 0; i < numbofbombs; i++) {
        bombvel[i] += bombacel[i];
        bombposY[i] += bombvel[i]
    }
    if (time > timeperiod) {
        numbofbombs += 5
        initBombs();
        time = 0
    }
}

function initBombs() {
    for (var i = 0; i < numbofbombs; i++) {
        bombacel[i] = random(.02, .03);
        bombvel[i] = random(0, 5);
        bombposX[i] = random(zapperwidth + (0.5 * ball_diameter), width);
        bombposY[i] = random(-20, -0.5 * ball_diameter);
    }
}

function bombCollision() {
    var temp = 0.5 * (ball_diameter + bomb_diameter) - 2;
    var distance;

    for (var i = 0; i < numbofbombs; i++) {
        distance = dist(xpoint, ypoint, bombposX[i], bombposY[i]);
        if (distance < temp) {
            return true;
        }
    }
    return false;

}

function scoreUpdate() {
    score += 10;
    fill(255);
    text("SCORE: " + int(score / timeperiod), width - 80, 20)
}
