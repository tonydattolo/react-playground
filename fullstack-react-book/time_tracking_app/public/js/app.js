// Process:
//   1. Break the app into components
//   2. Build a static version of the app
//   3. Determine what should be stateful
//   4. Determine in which component each piece of state should live
//   5. Hard-code initial states
//   6. Add inverse data flow
//   7. Add server communication
/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
class TimersDashboard extends React.Component {
  state = {
    timers: [
      {
        title: "practice squat",
        project: "gym chores",
        id: uuid.v4(),
        elapsed: 643645,
        runningSince: Date.now(),
      },
      {
        title: "build stuff",
        project: "any project",
        id: uuid.v4(),
        elapsed: 453524,
        runningSince: null,
      },
    ],
  };

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };
  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
  };
  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };
  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, { // state needs to be immutable, dont forget. not modifying any objects sitting in state
            title: attrs.tittle,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      }),
    });
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList 
            timers={this.state.timers} 
            onFormSubmit={this.handleEditFormSubmit}
          />
          <ToggleableTimerForm
            isOpen={true}
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false,
  };
  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };
  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  };
  handleFormClose = () => {
    this.setState({ isOpen: false });
  };
  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button
            className="ui basic button icon"
            onClick={this.handleFormOpen}
          >
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}

class EditableTimerList extends React.Component {
  render() {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onFormSubmit={this.props.onFormSubmit}
      />
    ));
    return <div id="timers">{timers}</div>;
  }
}

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
  };
  handleFormClose = () => {
    this.closeForm();
  };
  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm;
  };
  closeForm = () => {
    this.setState({ editFormOpen: false });
  };
  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.props.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
        />
      );
    }
  }
}

// Leaf Components: hold majority of pages HTML
class Timer extends React.Component {
  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">{this.props.project}</div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span
              className="right floated edit icon"
              onClick={this.props.onEditClick}
            >
              <i className="edit icon" />
            </span>
            <span className="right floated trash icon">
              <i className="trash icon" />
            </span>
          </div>
        </div>
        <div className="ui bottom attached blue basic button">Start</div>
      </div>
    );
  }
}

class TimerForm extends React.Component {
  state = {
    title: this.props.title || "",
    project: this.props.project || "", // if creating, no props, input field cant be undef, need empty str
  };
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  handleProjectChange = (e) => {
    this.setState({
      project: e.target.value,
    });
  };
  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project,
    });
  };

  render() {
    const submitText = this.props.id ? "Update" : "Create";

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                defaultValue={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>
            <div className="field">
              <label>Project</label>
              <input
                type="text"
                defaultValue={this.state.project}
                onChange={this.handleProjectChange}
              />
            </div>
            <div className="ui two bottom attached buttons">
              <button
                className="ui basic blue button"
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className="ui basic red button"
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<TimersDashboard />, document.getElementById("content"));
