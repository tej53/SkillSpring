import React, { Component } from 'react';
import './CountPeople.css';

class CountPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrycount: 0,
      exitcount: 0,
    };
  }

  UpdateEntry = () => {
    this.setState({ entrycount: this.state.entrycount + 1 });
  };

  UpdateExit = () => {
    this.setState({ exitcount: this.state.exitcount + 1 });
  };

  render() {
    return (
      <div className="count-container">
        <div className="count-row">
          <button className="btn-login" onClick={this.UpdateEntry}>
            Login
          </button>
          <span>{this.state.entrycount} People Entered!!!</span>
        </div>
        <div className="count-row">
          <button className="btn-exit" onClick={this.UpdateExit}>
            Exit
          </button>
          <span>{this.state.exitcount} People Left!!!</span>
        </div>
      </div>
    );
  }
}

export default CountPeople;
