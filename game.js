// Variables
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];


// Starting the game
let started = false;
let level = 0;

$(document).on('keydown', function () {
  if (started === false) {
    nextSequence();
    $('#level-title').text('Level ' + level);
    started = true;
  }
});


// Check which button is pressed
$('.btn').on('click', function () {
  // Get the color that triggered the event and push it into the userClickedPattern array 
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  // Play the sound of the color that was chosen
  playSound(userChosenColor);

  // Add and removed the 'pressed' class from the color that was chosen 
  $('#' + userChosenColor).addClass('pressed');

  setTimeout(function () {
    $('#' + userChosenColor).removeClass('pressed');
  }, 100);

  checkAnswer(userClickedPattern.length - 1);
});


// Check the users answer from the pattern 
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
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

    $('#level-title').text('Game over, Press Any Key to Restart!');
    startOver();
  }
}


// Next Sequence
function nextSequence() {
  // Make sure the user clicked pattern is empty so we can check to see if they did the right pattern
  userClickedPattern = [];

  // Get random number to pick a color from the array 
  let randomNumber = Math.floor((Math.random() * 4));
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Using the game pattern array, choose a color to flash to the user
  $('#' + gamePattern[gamePattern.length - 1]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound of the color that was chosen
  playSound(randomChosenColor);

  // Increase the level number
  level++;

  // Change the heading text 
  $('#level-title').text('Level ' + level);
}


// Start Over 
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}


// Play sound 
function playSound(name) {
  var keySound = new Audio('sounds/' + name + '.mp3');
  keySound.play();
}