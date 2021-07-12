import React from 'react';
import '../App.css';
import BreakInterval from './BreakInterval';
import SessionLength from './SessionLength';
import Timer from './Timer';
import Counter from './Counter';
import ToDoList from './ToDoList';

const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinute: 25,
      isPlay: false,
      count: 0,
      viewCompleted: false,
      todoList: todoItems,
    };

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
    this.displayCompleted = this.displayCompleted.bind(this);
    this.renderTabList = this.renderTabList.bind(this);
    this.renderItems = this.renderItems.bind(this);
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

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete 
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li 
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
          >
            Edit 
          </button>
          <button
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

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
      <ToDoList
        displayCompleted={this.displayCompleted}
        renderTabList={this.renderTabList}
        renderItems={this.renderItems}
      />
    </main>
    );
  }
}

export default App;
