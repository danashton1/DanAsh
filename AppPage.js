var order = [];
var playerOrder = [];
var playerTurn;
var compTurn;
var score;
var random;
var lightInterval;

document.getElementById('startButton').onclick = function() {
    play();
};
function play() {
 order = [];
 playerOrder = [];
 lightInterval = 0;

    for (var i = 0; i < 20; i++) {
             random = Math.floor(Math.random() * 4) + 1
            order.push(random);
        }
    compTurn = true;

    lightInterval = setInterval(gameturn, 700);
}

function gameturn() {
    if(playerTurn){
        clearInterval(lightInterval);
        compTurn = false;
        clearColour();
    }
    if(compTurn){
        clearColour();
    }

}
