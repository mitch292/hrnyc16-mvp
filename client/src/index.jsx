import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      traditional: [],
      sabr: [],
      statcast: [],
      isLoading: false
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <h3>Hold on just a sec...</h3>
      )
    }
    return (
      <div>
        <h1>Battle of Baseball Statics</h1>



      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();

//each category in the state will be an array of objects that contain
  //stat category and count