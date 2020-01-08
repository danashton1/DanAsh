var CompOrder=[];
var PlayerOrder=[];
var score= 0;

function btnStart_Onclick(){
    $("h1").text("Memory tester");
    CompOrder = [];
	document.getElementById("startButton").disabled = true;
    $('#1').removeClass('disabled');
    $('#2').removeClass('disabled');
    $('#3').removeClass('disabled');
    $('#4').removeClass('disabled');
    $('#5').removeClass('disabled');
    $('#6').removeClass('disabled');
	nextSeq();
}
//Generates a random number and pushes it to the array.
function nextSeq() {
 CompOrder.push(Math.floor(Math.random()*6));
 showSeq(CompOrder[CompOrder.length - 1]);
 PlayerOrder=[];
};
//Displays the colour and sound of each light
function showSeq(element) {
    switch (element){
        case 0:
              $("#1").addClass("selectedbtn");
            var Gaudio = document.getElementById("soundbtnGre");
            Gaudio.play();
              setTimeout(function(){
                  $("#1").removeClass("selectedbtn");
              },500)
              break;
        case 1:
            $("#2").addClass("selectedbtn");
            var Raudio = document.getElementById("soundbtnRed");
            Raudio.play();
              setTimeout(function () {
                  $("#2").removeClass("selectedbtn");
              }, 500)
            break;
        case 2:
              $("#3").addClass("selectedbtn");
            var Yaudio = document.getElementById("soundbtnYel");
            Yaudio.play();
              setTimeout(function () {
                $("#3").removeClass("selectedbtn");
              }, 500)
            break;
        case 3:
            $("#4").addClass("selectedbtn");
            var Baudio = document.getElementById("soundbtnBlu");
            Baudio.play();
              setTimeout(function () {
                  $("#4").removeClass("selectedbtn");
              }, 500)
            break;
        case 4:
            $("#5").addClass("selectedbtn");
            var Laudio = document.getElementById("soundbtnWhi");
            Laudio.play();
            setTimeout(function () {
                $("#5").removeClass("selectedbtn");
            }, 500)
            break;
        case 5:
            $("#6").addClass("selectedbtn");
            var BLaudio = document.getElementById("soundbtnBla");
            BLaudio.play();
            setTimeout(function () {
                $("#6").removeClass("selectedbtn");
            }, 500)
            break;
    }
 };
function increaseScore() {
    score++;
    $("#parScore").text(`Score: ${score}`);
    
};
//Pushes user response in to a new array.
$(".btn").click(function(e){
        var userClicked= $(this).attr("id");
        switch(userClicked){
            case "1":
                PlayerOrder.push(0);
                showSeq(0);
                break;

            case "2":
                PlayerOrder.push(1);
                showSeq(1);
                break;
            
            case "3":
                PlayerOrder.push(2);
                showSeq(2);
                break;
            
            case "4":
                PlayerOrder.push(3);
                showSeq(3);
                break;
            case "5":
                PlayerOrder.push(4);
                showSeq(4);
                break;
            case "6":
                PlayerOrder.push(5);
                showSeq(5);
                break;
            }
        checkSeq(PlayerOrder.length-1);
    });
//Checking sequence matches so far
function checkSeq(indexOfArray) {
    if(PlayerOrder[indexOfArray] === CompOrder[indexOfArray]){
      if(CompOrder.length === PlayerOrder.length) {
          increaseScore()
           setTimeout(function () {
            nextSeq();
           }, 1500);
        }
    } else {
      gameOver();
    }
}
function gameOver(){
    var Waudio = document.getElementById("soundbtnWrong");
    Waudio.play();
		document.getElementById("startButton").disabled = false;
    $('#1').addClass('disabled');
    $('#2').addClass('disabled');
    $('#3').addClass('disabled');
    $('#4').addClass('disabled');
    $('#5').addClass('disabled');
    $('#6').addClass('disabled');
    $("h1").text("Game Over");
    $("#parScore").text("You scored: " + score);
    setTimeout(function () {
        $("h1").text("Play again");
    }, 2700)
    score = 0;
    CompOrder = [];
}
var lightState;
function getLightURI(element)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + element.attr("id")+"/";
}
function togglelight(element)
{
    var getState = $.getJSON(getLightURI(element), function (data)
    {
        var state = data["state"]["on"];
        if (state)
        {
            state = false;
        }
        else
        {
            state = true;
        }

        lightState = {"on" : state};

        $.ajax({
            url: getLightURI(element) + "state/",
            type: "PUT",
            data: JSON.stringify(lightState)
        })
    });
}
//Making functions to turn on the hue lights
$(document).ready(function()
{
    blueLight();
    redLight();
    yellowLight();
    greenLight();
    whiteLight();
    turquoiseLight();
});
function blueLight() {
    $('#1').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/1/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":46920}),
        });
    })
}

function redLight() {
    $('#4').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/4/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":65535}),
        });
    })
}

function yellowLight() {
    $('#2').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/2/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":9999}),
        });
    })
}

function greenLight() {
    $('#5').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/5/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":25500}),
        });
    })
}

function whiteLight() {
    $('#3').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/3/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":012299}),
        });
    })
}

function turquoiseLight() {
    $('#6').click(function () {
        togglelight($(this));
        $.ajax({
            url:"http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/6/state/",
            type: "PUT",
            data: JSON.stringify({"on":true,"bri":254,"hue":33333}),
        });
    })
}
