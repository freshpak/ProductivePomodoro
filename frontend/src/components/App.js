import React from 'react';
import '../App.css';
import BreakInterval from './BreakInterval';
import SessionLength from './SessionLength';
import Timer from './Timer';
import Counter from './Counter';
import ToDoList from './ToDoList';
import CustomModal from './Modal';
import axios from 'axios';

if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}

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
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
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
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.createItem = this.createItem.bind(this);
    this.editItem = this.editItem.bind(this);
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

      this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios 
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

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
          <b>{item.title}</b><br/>
          &emsp;{item.description}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit 
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
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
      <h2>ProductivePomodoro</h2>
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
        createItem={this.createItem}
      />
      {this.state.modal ? (
        <CustomModal
          activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit}
        />
      ) : null}
    </main>
    );
  }
}

export default App;
