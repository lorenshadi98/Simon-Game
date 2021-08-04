var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var currentLevel = 0;

$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('Level ' + currentLevel);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id');

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // calls the checkAnswer function to check if userChosenColour
  // is the same as the gamePattern.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  currentLevel = currentLevel + 1;

  $('#level-title').text('Level ' + currentLevel);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.wav');

  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');

  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function startOver() {
  currentLevel = 0;
  gamePattern = [];
  started = false;
}
