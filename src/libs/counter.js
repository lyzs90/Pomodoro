// COUNTER ========================================================
let counter = () => {

  // calculate the minutes and seconds from bigTime
  model.mins = Math.floor(model.bigTime / 60);
  model.secs = model.bigTime - model.mins * 60;

  // change the HTML to show new minutes and seconds
  minutes.innerHTML = (model.mins < 10 ? '0' : '') + model.mins;
  seconds.innerHTML = (model.secs < 10 ? '0' : '') + model.secs;

  // handle the animations
    let divisor = 300;

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

module.exports = counter;
