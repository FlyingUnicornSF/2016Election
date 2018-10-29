import React, { Component } from 'react';
import Histogram from './components/Histogram';
//import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      something: [],
    }
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <Histogram />
      </div>
    );
  }
}

export default App;
