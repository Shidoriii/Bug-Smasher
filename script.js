const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

let bug = {
    x: 100,
    y: 100,
    speed: 1500,
    size: 100 
};

let score = 0;
const scoreDisplay = document.getElementById("score");
const resetSpeedBtn = document.getElementById("resetSpeed");
const resetScoreBtn = document.getElementById("resetScore");

const bugImage = new Image();
bugImage.src = "ladybug.png"; 

const smashSound = new Audio("smash.mp3"); 

function moveBug() {
    bug.x = Math.random() * (canvas.width - bug.size);
    bug.y = Math.random() * (canvas.height - bug.size);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const aspectRatio = bugImage.width / bugImage.height;
    const newWidth = bug.size;
    const newHeight = newWidth / aspectRatio;

    ctx.drawImage(bugImage, bug.x, bug.y, newWidth, newHeight);
}

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const aspectRatio = bugImage.width / bugImage.height;
    const newWidth = bug.size;
    const newHeight = newWidth / aspectRatio;

    if (
        mouseX >= bug.x &&
        mouseX <= bug.x + newWidth &&
        mouseY >= bug.y &&
        mouseY <= bug.y + newHeight
    ) {
        score++;
        scoreDisplay.textContent = score;
        bug.speed = Math.max(300, bug.speed - 100); 

        smashSound.currentTime = 0;
        smashSound.play();

        moveBug();
    }
});

resetSpeedBtn.addEventListener("click", function() {
    bug.speed = 1500;
});

resetScoreBtn.addEventListener("click", function() {
    score = 0;
    scoreDisplay.textContent = score;
});

function main() {
    moveBug();
    render();
    setTimeout(main, bug.speed);
}

bugImage.onload = () => {
    main();
};
