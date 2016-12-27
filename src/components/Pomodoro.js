'use strict';

import React from 'react';
import GithubCorner from 'react-github-corner';
import timeToString from '../libs/timeToString';
import shadeColor from '../libs/shadeColor';

// PRESENTATIONAL COMPONENT: a simple stateless React View
const Button = ({onClick, btnClass, label}) => (
  <button onClick={onClick} className={btnClass}>{label}</button>
);

// REACT COMPONENT: a stateful React View (stored in this.state)
// Normally you'd want so other Model to store state (i.e. Redux)
export default class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
        mins: '25',
        secs: '00',
        message: 'Let\'s get started',
        checkmarks: '',
        color: '028482',
        bigTime: 1500,
        mode: 'normal',
        percent: 0,
        countdownID: '',
        display: ['', 'hide', 'hide']
    };
  }
  // CONTROLLERS: update state based on user input
    componentDidMount() {
        console.log('Component Did Mount.');
        Notification.requestPermission();
    }

    start() {
        let count = setInterval(() => {
            // calculate the minutes and seconds from bigTime
            let tempMins = Math.floor(this.state.bigTime / 60);
            let tempSecs = this.state.bigTime - this.state.mins * 60;

            // handle the animations
            let divisor = 300;
            let tempPercent = tempSecs / divisor;
            let tempColor = this.state.color;
            document.body.style.background = "#" + this.state.color;

            // change the message at 20
            if (this.state.mins == 20) {
              this.setState({message: "Stay focused"});
            }

            // switch modes if timer ends
            if (this.state.bigTime == -1) {
              if (this.state.mode == "normal") {
                    // send alert
                    console.log('Alert Sent.');
                    let notification = new Notification("Awesome, you may now go for a short breather.", {
                        icon: "",
                        lang: "en",
                        body: "Go get that cuppa."
                    });

                    this.setState({
                    // cooldown is 5min
                    mode: "cooldown",
                    bigTime: 300,
                    // everytime the timer ends naturally, increment checkmarks and write to DOM
                    checkmarks: this.state.checkmarks.concat(' \u2713')
                });
              } else if (this.state.mode == "cooldown") {
                // stop timer
                clearInterval(this.state.countdownID);
                document.body.style.background = "#" + this.state.color;

                // send alert
                console.log('Alert Sent.');
                let notification = new Notification("Your break is up!", {
                    icon: "",
                    lang: "en",
                    body: "Keep pushing on~"
                });

                this.setState({
                    // switch back to normal 25min mode
                    mode: "normal",
                    bigTime: 1500,
                    // show start button
                    display: ['', 'hide', 'hide']
                });
              }

            } else {
              // decrement
              this.setState({
                  bigTime: this.state.bigTime - 1,
                  mins: timeToString(tempMins),
                  secs: timeToString(tempSecs),
                  percent: tempPercent,
                  color: shadeColor(tempColor, -tempPercent)
              });
            }
        }, 1); // 1000ms is 1 second

        this.setState({
            countdownID: count,
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
                <GithubCorner href="https://github.com/lyzs90/Pomodoro" bannerColor="#fff" octoColor="#028482" />
                <div id="header">
                    <span>{this.state.message}</span>
                    <span>{this.state.checkmarks}</span>
                </div>
                <div id="timer">
                    <span>{this.state.mins}</span>
                    <span>:</span>
                    <span>{this.state.secs}</span>
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
