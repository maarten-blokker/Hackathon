import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Carousel from './components/Carousel'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />        
        <Carousel />
      </div>
    );
  }
}

export default App;
