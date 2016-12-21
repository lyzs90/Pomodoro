import React from 'react';
import counter from '../libs/counter';
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
    }
  }
  // CONTROLLERS: update state based on user input
  start() {
    this.setState({
        //countdownID: setInterval("counter()", 10),
        message: "Slow and steady wins something",
        display: ['hide', '', 'hide']
    });
  }
  stop() {
    // stop timer
    //clearInterval(this.state.countdownID);
    this.setState({
        message: "Why are you such a quitter",
        display: ['hide', 'hide', '']
    });
  }
  reset() {
    this.setState({
        // reset clock
        bigTime: 1500,
        //mins: Math.floor(this.state.bigTime / 60),
        //secs: this.state.bigTime - this.state.mins * 60,
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
