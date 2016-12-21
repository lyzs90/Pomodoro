// COUNTER ========================================================
let counter = (bigTime, mins, secs, color, mode, checkmarks, countdownID, display) => {

  // calculate the minutes and seconds from bigTime
  mins = Math.floor(bigTime / 60);
  secs = bigTime - mins * 60;

  // handle the animations
    let divisor = 300;

    percent = secs / divisor;
    color = shadeColor(color, -percent);
    document.body.style.background = "#" + color;

  // change the message at 20
  if (mins == 20) {
    message = "Stay focused";
  }

  // switch modes if timer ends
  if (bigTime == 0) {
    if (mode == "normal") {

      // cooldown is 5min
      mode = "cooldown";
      bigTime = 300;

      // everytime the timer ends naturally, increment checkmarks and write to DOM
      checkmarks += '&nbsp;&#10004;';

    } else if (mode == "cooldown") {

      // switch back to normal 25min mode
      mode = "normal";
      bigTime = 1500;
      document.body.style.background = "#" + color;

      // show start button
      display: ['', 'hide', 'hide']

      // stop timer
      clearInterval(countdownID);
    }

  } else {
    // decrement
    bigTime = bigTime - 1;
  }

}

module.exports = counter;
