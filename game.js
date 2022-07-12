//javascript.js
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function () {
  //if we are playing

  if (playing == true) {
    location.reload(); //reload page
  } else {
    //if we are not playing

    //change mode to playing

    playing = true;

    //set score to 0

    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    //show countdown box

    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    //hide game over box

    hide("gameOver");

    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    //start countdown

    startCountdown();

    //generate a new Q&A

    generateQA();
  }
};

//Clicking on an answer box

for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    //check if we are playing
    if (playing == true) {
      //yes
      if (this.innerHTML == correctAnswer) {
        //correct answer

        //increase score by 1
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        //hide wrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        //Generate new Q&A

        generateQA();
      } else {
        //wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 2000);
      }
    }
  };
}
//if we click on answer box
//if we are playing
//correct?
//yes
//increase score
//show correct box for 1sec
//generate new Q&A
//no
//show try again box for 1sec

//functions

//start counter

function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      // game over
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

//stop counter

function stopCountdown() {
  clearInterval(action);
}

//hide an element

function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show an element

function show(Id) {
  document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers

function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

  //fill other boxes with wrong answers

  var answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random())); //a wrong answer
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}

/********text animation**************** */

// const elts = {
//     text1: document.getElementById("text1"),
//     text2: document.getElementById("text2")
// };

// const texts = [
//     "A game is the",
//     "complete exploration",
//     "of freedom within a",
//     "restrictive environment.",
//     "Give a try",
//     "to make more score",
//     ":) by @Sowmiya A"
// ];

// const morphTime = 1;
// const cooldownTime = 0.25;

// let textIndex = texts.length - 1;
// let time = new Date();
// let morph = 0;
// let cooldown = cooldownTime;

// elts.text1.textContent = texts[textIndex % texts.length];
// elts.text2.textContent = texts[(textIndex + 1) % texts.length];

// function doMorph() {
//     morph -= cooldown;
//     cooldown = 0;

//     let fraction = morph / morphTime;

//     if (fraction > 1) {
//         cooldown = cooldownTime;
//         fraction = 1;
//     }

//     setMorph(fraction);
// }

// function setMorph(fraction) {
//     elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
//     elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

//     fraction = 1 - fraction;
//     elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
//     elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

//     elts.text1.textContent = texts[textIndex % texts.length];
//     elts.text2.textContent = texts[(textIndex + 1) % texts.length];
// }

// function doCooldown() {
//     morph = 0;

//     elts.text2.style.filter = "";
//     elts.text2.style.opacity = "100%";

//     elts.text1.style.filter = "";
//     elts.text1.style.opacity = "0%";
// }

// function animate() {
//     requestAnimationFrame(animate);

//     let newTime = new Date();
//     let shouldIncrementIndex = cooldown > 0;
//     let dt = (newTime - time) / 1000;
//     time = newTime;

//     cooldown -= dt;

//     if (cooldown <= 0) {
//         if (shouldIncrementIndex) {
//             textIndex++;
//         }

//         doMorph();
//     } else {
//         doCooldown();
//     }
// }

// animate();
