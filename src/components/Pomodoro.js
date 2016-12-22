import React from 'react';
//import counter from '../libs/counter';
import shadeColor from '../libs/shadeColor';

// PRESENTATIONAL COMPONENT: a simple stateless React View
const Button = ({onClick, btnClass, label}) => (
  <button onClick={onClick} className={btnClass}>{label}</button>
);

// REACT COMPONENT: a stateful React View (stored in this.state)
// Normally you'd want so other Model to store state (i.e. Redux)
class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
        mins: '25',
        secs: '00',
        message: 'Let\'s get started',
        checkmarks: '',
        color: '0D5B85',
        bigTime: 1500,  // time in seconds
        mode: 'normal',
        percent: 0,
        countdownID: '',
        display: ['', 'hide', 'hide']
    };
  }
  // CONTROLLERS: update state based on user input
  start() {
    this.setState({
        countdownID: setInterval(() => {
            // calculate the minutes and seconds from bigTime
            this.state.mins = Math.floor(this.state.bigTime / 60);
            this.state.secs = this.state.bigTime - this.state.mins * 60;

            // change the HTML to show new minutes and seconds
            this.state.mins = (this.state.mins < 10 ? '0' : '') + this.state.mins;
            this.state.secs = (this.state.secs < 10 ? '0' : '') + this.state.secs;

            // handle the animations
              let divisor = 300;

              this.state.percent = this.state.secs / divisor;
              this.state.color = shadeColor(this.state.color, -this.state.percent);
              document.body.style.background = "#" + this.state.color;

            // change the message at 20
            if (this.state.mins == 20) {
              this.state.message = "Stay focused";
            }

            // switch modes if timer ends
            if (this.state.bigTime == 0) {
              if (this.state.mode == "normal") {

                // cooldown is 5min
                this.state.mode = "cooldown";
                this.state.bigTime = 300;

                // everytime the timer ends naturally, increment checkmarks and write to DOM
                this.state.checkmarks += '&nbsp;&#10004;';

              } else if (this.state.mode == "cooldown") {

                // switch back to normal 25min mode
                this.state.mode = "normal";
                this.state.bigTime = 1500;
                document.body.style.background = "#" + this.state.color;

                // show start button
                this.state.display = ['', 'hide', 'hide'];

                // stop timer
                clearInterval(this.state.countdownID);
              }

            } else {
              // decrement
              this.state.bigTime = this.state.bigTime - 1;
            }
        }, 10),
        message: "Slow and steady wins something",
        display: ['hide', '', 'hide']
    });
  }
  stop() {
    // stop timer
    clearInterval(this.state.countdownID);
    this.setState({
        message: "Why are you such a quitter",
        display: ['hide', 'hide', '']
    });
  }
  reset() {
    this.setState({
        // reset clock
        bigTime: 1500,
        mins: '25',
        secs: '00',
        message: "Try not to get distracted again",
        display: ['', 'hide', 'hide']
    });
  }
  render() {
    return (
        <div>
            <div id="header">
                <span id="message">{this.state.message}</span>
                <span id="checkmarks">{this.state.checkmarks}</span>
            </div>
            <div id="timer">
                <span id="minutes">{this.state.mins}</span>
                <span id="middle">:</span>
                <span id="seconds">{this.state.secs}</span>
            </div>
            <div id="buttons">
                <Button onClick={this.start.bind(this)} btnClass={this.state.display[0]} label={'Start'}/>
                <Button onClick={this.stop.bind(this)}  btnClass={this.state.display[1]} label={'Stop'}/>
                <Button onClick={this.reset.bind(this)}  btnClass={this.state.display[2]} label={'Reset'}/>
            </div>
            <div id="test">{'#' + this.state.color}</div>
        </div>
    );
  }
}

export default Pomodoro;
