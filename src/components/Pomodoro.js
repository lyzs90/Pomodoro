'use strict';

import React from 'react';
import GithubCorner from 'react-github-corner';
import { timeToString, shadeColor } from '../libs/utils';
import { Button } from './Button';

export default class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
        mins: '25',
        secs: '00',
        message: 'Let\'s get started',
        checkmarks: '',
        color: '028482',
        mode: 'normal',
        percent: 0,
        countdownID: ''
    };
  }

    componentDidMount() {
        console.log('Component Did Mount.');
        Notification.requestPermission();
    }

    start() {
        this.props.changeButton();
        let count = setInterval(() => {
            // calculate the minutes and seconds from bigTime
            let tempMins = Math.floor(this.props.bigTime / 60);
            let tempSecs = this.props.bigTime - this.state.mins * 60;

            // handle the animations
            let tempPercent = tempSecs / 295; // doesn't work if more than 295
            let tempColor = shadeColor(this.state.color, -tempPercent);
            document.body.style.background = "#" + tempColor;

            // change the message at 20
            if (this.state.mins == 20) {
              this.setState({message: "Stay focused"});
            }

            // switch modes if timer ends
            if (this.props.bigTime == -1) {
              if (this.state.mode == "normal") {
                    // send alert
                    let notification = new Notification("Awesome, you may now go for a short breather.", {
                        icon: "",
                        lang: "en",
                        body: "Go get that cuppa."
                    });
                    this.props.cooldown();
                    this.setState({
                    // cooldown is 5min
                    mode: "cooldown",
                    // everytime the timer ends naturally, increment checkmarks and write to DOM
                    checkmarks: this.state.checkmarks.concat(' \u2713')
                });
              } else if (this.state.mode == "cooldown") {
                // stop timer
                clearInterval(this.state.countdownID);
                document.body.style.background = "#" + tempColor;

                // send alert
                console.log('Alert Sent.');
                let notification = new Notification("Your break is up!", {
                    icon: "",
                    lang: "en",
                    body: "Keep pushing on~"
                });
                this.props.resetTimer();
                this.setState({
                    // switch back to normal 25min mode
                    mode: "normal"
                });
              }

            } else {
              // decrement
              this.props.countdown();
              this.setState({
                  mins: timeToString(tempMins),
                  secs: timeToString(tempSecs),
                  percent: tempPercent,
                  color: tempColor
              });
            }
        }, 1000); // 1000ms is 1 second

        this.setState({
            countdownID: count,
            message: "Slow and steady wins something"
        });
    }

    stop() {
        // stop timer
        clearInterval(this.state.countdownID);
        this.props.changeButton();
        this.setState({
            message: "Why are you such a quitter"
        });
    }

    reset() {
        this.props.resetTimer();
        this.props.changeButton();
        this.setState({
            // reset clock
            mins: '25',
            secs: '00',
            message: "Try not to get distracted again"
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
                    <Button onClick={this.start.bind(this)} btnClass={this.props.btnVisiblity[0]} label={'Start'}/>
                    <Button onClick={this.stop.bind(this)}  btnClass={this.props.btnVisiblity[1]} label={'Stop'}/>
                    <Button onClick={this.reset.bind(this)}  btnClass={this.props.btnVisiblity[2]} label={'Reset'}/>
                </div>
            </div>
        );
    }
}
