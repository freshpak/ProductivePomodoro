import React from 'react';
import '../App.css';
import BreakInterval from './BreakInterval';
import SessionLength from './SessionLength';
import Timer from './Timer';
import Counter from './Counter';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      isPlay: false,
      count: 0
    }

    this.onIncreaseBreakLength = this.onIncreaseBreakLength.bind(this);
    this.onDecreaseBreakLength = this.onDecreaseBreakLength.bind(this);
    this.onIncreaseSessionLength = this.onIncreaseSessionLength.bind(this);
    this.onDecreaseSessionLength = this.onDecreaseSessionLength.bind(this);
    this.onToggleInterval = this.onToggleInterval.bind(this);
    this.onUpdateTimerMinute = this.onUpdateTimerMinute.bind(this);
    this.onPlayTimer = this.onPlayTimer.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
    this.onIncreaseCounter = this.onIncreaseCounter.bind(this);
    this.onResetCounter = this.onResetCounter.bind(this);
  }

  componentDidUpdate() {
    window.localStorage.setItem('state', JSON.stringify(this.state.count));
  }

  componentDidMount() {
      let state = JSON.parse(window.localStorage.getItem('state'));
      if (state) {
        this.setState({
          count: state
        });
      }
  }

  onIncreaseBreakLength() {
    this.setState(prevState => {
      return {
        breakLength: prevState.breakLength + 1
      };
    });
  }

  onDecreaseBreakLength() {
    this.setState(prevState => {
      return {
        breakLength: prevState.breakLength - 1
      };
    });
  }

  onIncreaseSessionLength() {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength + 1,
        timerMinute: prevState.sessionLength + 1
      };
    });
  }

  onDecreaseSessionLength() {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength - 1,
        timerMinute: prevState.sessionLength - 1
      };
    });
  }

  onUpdateTimerMinute() {
    this.setState((prevState) => {
      return {
        timerMinute: prevState.timerMinute - 1
      };
    });
  }

  onToggleInterval(isSession) {
    if (isSession) {
      this.setState({
        timerMinute: this.state.sessionLength
      })
    } else {
      this.setState({
        timerMinute: this.state.breakLength
      });
    };
  }

  onResetTimer() {
    this.setState({
      timerMinute: this.state.sessionLength
    });
  }

  onPlayTimer(isPlay) {
    this.setState({
      isPlay: isPlay
    });
  }

  onIncreaseCounter() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }

  onResetCounter() {
    this.setState({
      count: 0
    });
  }

  render() {
    return (
    <main>
      <h2>Pomodoro</h2>
      <section className="interval-length-container">
        <BreakInterval
          isPlay={this.state.isPlay} 
          breakInterval={this.state.breakLength} 
          increaseBreak={this.onIncreaseBreakLength}
          decreaseBreak={this.onDecreaseBreakLength}
        />
        <SessionLength
          isPlay={this.state.isPlay} 
          sessionLength={this.state.sessionLength} 
          increaseSession={this.onIncreaseSessionLength}
          decreaseSession={this.onDecreaseSessionLength}
        />
      </section>
      <Timer
        isPlay={this.state.isPlay} 
        timerMinute={this.state.timerMinute}
        breakLength={this.state.breakLength}
        updateTimerMinute={this.onUpdateTimerMinute}
        toggleInterval={this.onToggleInterval}
        resetTimer={this.onResetTimer}
        onPlayTimer={this.onPlayTimer} 
        increaseCounter={this.onIncreaseCounter}
      />
      <Counter
        count={this.state.count}
        resetCounter={this.onResetCounter}
      />
    </main>
    );
  }
}

export default App;
