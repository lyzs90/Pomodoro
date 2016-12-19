"use strict";

// MODEL: where we store all the data
var model = {
    mins: '25',
    secs: '00',
    message: 'Let\'s get started',
    checkmarks: '',
    color: '0D5B85',
    bigTime: 1500,  // time in seconds
    mode: 'normal',
    percent: 0,
    countdownID: ''
}

// VIEW: DOM nodes representing what is displayed on page
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var message = document.getElementById("message");
var checkmarks = document.getElementById("checkmarks");

var test = document.getElementById("test");

// CONTROLLER: how user interaction translates to model changes
var start = document.getElementById("start");
start.addEventListener("click", startTimer, false);

var stop = document.getElementById("stop");
stop.addEventListener("click", stopTimer, false);

var reset = document.getElementById("reset");
reset.addEventListener("click", resetTimer, false);

//INIT: init page with default values
minutes.innerHTML = model.mins;
seconds.innerHTML = model.secs;
message.innerHTML = model.message;
checkmarks.innerHTML = model.checkmarks;

// COUNTER ========================================================
function counter() {

  // calculate the minutes and seconds from bigTime
  model.mins = Math.floor(model.bigTime / 60);
  model.secs = model.bigTime - model.mins * 60;

  // change the HTML to show new minutes and seconds
  minutes.innerHTML = (model.mins < 10 ? '0' : '') + model.mins;
  seconds.innerHTML = (model.secs < 10 ? '0' : '') + model.secs;

  // handle the animations
    var divisor = 300;

    model.percent = model.secs / divisor;
    model.color = shadeColor(model.color, -model.percent);
    document.body.style.background = "#" + model.color;
    test.innerHTML = '#' + model.color;

  // change the message at 20
  if (model.mins == 20) {
    message.innerHTML = "Stay focused";
  }

  // switch modes if timer ends
  if (model.bigTime == 0) {
    if (model.mode == "normal") {

      // cooldown is 5min
      model.mode = "cooldown";
      model.bigTime = 300;

      // everytime the timer ends naturally, increment checkmarks and write to DOM
      model.checkmarks += '&nbsp;&#10004;';

      checkmarks.innerHTML = model.checkmarks;

    } else if (model.mode == "cooldown") {

      // switch back to normal 25min mode
      model.mode = "normal";
      model.bigTime = 1500;

      minutes.innerHTML = model.mins;
      seconds.innerHTML = model.secs;

      document.body.style.background = "#" + model.color;

      // show start button
      start.style.display = "block";
      stop.style.display = "none";
      reset.style.display = "none";

      // stop timer
      clearInterval(model.countdownID);
    }

  } else {
    // decrement
    model.bigTime = model.bigTime - 1;
  }

}

// ACTIONS =======================================================

// start timer
function startTimer() {
  // start timer
  model.countdownID = setInterval("counter()", 10);

  // show message
  message.innerHTML = "Slow and steady wins something";

  // show stop button
  start.style.display = "none";
  stop.style.display = "block";
  reset.style.display = "none";
}

// stop timer
function stopTimer() {
  // change message
  message.innerHTML = "Why are you such a quitter";

  // stop timer
  clearInterval(model.countdownID);

  // show reset button
  start.style.display = "none";
  stop.style.display = "none";
  reset.style.display = "block";
}

// reset timer
function resetTimer() {
  // reset clock
  model.bigTime = 1500;
  model.mins = Math.floor(model.bigTime / 60);
  model.secs = model.bigTime - model.mins * 60;
  minutes.innerHTML = (model.mins < 10 ? '0' : '') + model.mins;
  seconds.innerHTML = (model.secs < 10 ? '0' : '') + model.secs;

  // change message
  message.innerHTML = "Try not to get distracted again";

  // show start button
  start.style.display = "block";
  stop.style.display = "none";
  reset.style.display = "none";
}

// HELPER FUNCTIONS ============================================
function shadeColor(color, percent) {
    var num = parseInt(color,16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;
    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}
