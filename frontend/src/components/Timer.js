import React from 'react';
import * as workerTimers from 'worker-timers';
import notification from '../audio/bells.wav';
import {Howl} from 'howler';

class Timer extends React.Component {
	constructor() {
		super();

		this.state = {
			isSession: true,
			timerSecond: 0,
			intervalId: 0,
			sound: new Howl({
				src: [notification],
				volume: 0.5
			})
		}

		this.startTimer = this.startTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.decreaseTimer = this.decreaseTimer.bind(this);
	}

	startTimer() {
		let intervalId = workerTimers.setInterval(this.decreaseTimer, 1000);
		this.props.onPlayTimer(true);
		this.setState({
			intervalId: intervalId
		})
	}

	decreaseTimer() {
		switch (this.state.timerSecond) {
			case 0:
				if (this.props.timerMinute === 0) {
					if (this.state.isSession) {
						this.setState({
							isSession: false
						});

						this.props.toggleInterval(this.state.isSession);
						this.state.sound.play();
						this.props.increaseCounter();
					} else {
						this.setState({
							isSession: true
						});

						this.props.toggleInterval(this.state.isSession);
						this.state.sound.play();
					}
				} else {
					this.props.updateTimerMinute();
					this.setState({
						timerSecond: 59
					});
				}
				break;
			default:
				this.setState((prevState) => {
					return {
						timerSecond: prevState.timerSecond - 1
					};
				});
				break;
		}
		document.title = "(" + this.props.timerMinute + 
			":" + (this.state.timerSecond < 10 ? "0" + this.state.timerSecond : this.state.timerSecond) + 
			")" + (this.state.isSession === true ? " - Focus" : " - Break");
	}

	stopTimer() {
		if (this.props.isPlay === true) {
			workerTimers.clearInterval(this.state.intervalId);
			this.props.onPlayTimer(false);
		}
	}

	resetTimer() {
		this.stopTimer();
		this.props.resetTimer();
		this.props.onPlayTimer(false);
		this.setState({
			timerSecond: 0,
			isSession: true
		});
		document.title = "ProductivePomodoro";
	}


	render() {
		return (
			<section>
				<section className="timer-container">
					<h4>{this.state.isSession === true ? "Session" : "Break"}</h4>
					<span className="timer">{this.props.timerMinute}</span>
					<span className="timer">:</span>
					<span className="timer">
					  {this.state.timerSecond === 0 
					  	? "00" 
					  	: this.state.timerSecond < 10 
					  	? "0" + this.state.timerSecond 
					  	: this.state.timerSecond}
					</span>
				</section>
				<section className="timer-actions">
					<button 
						className="custom-start-button"
						disabled={this.props.isPlay === true ? "disabled" : ""} 
						onClick={this.startTimer}
					>
						Start
					</button>
					<button className="custom-stop-button" onClick={this.stopTimer}>Stop</button>
					<button className="custom-button" onClick={this.resetTimer}>Reset</button>
				</section>
			</section>
		);
	}
}

export default Timer;