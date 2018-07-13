import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      traditional: 'click below',
      sabr: 'click below',
      statcast: 'click below',
      isLoading: false
    }
    this.setState = this.setState.bind(this);
    this.fetchOurData = this.fetchOurData.bind(this);
    this.searchTwitter = this.searchTwitter.bind(this);
  }


  searchTwitter(value) {

    //create a date for our query
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate() - 1;
    let year = dateObj.getUTCFullYear();
    let newdate = `${year}-${month}-${day}`;

    //each statistical categories query 
    const eraQueries = {
      statcast: `statcast OR "stat cast" OR "exit velocity" OR "exit velo" OR "launch angle" OR "catch probability" OR "outs above average" since:${newdate}`,
      sabr: `sabermetrics OR wRC+ OR OPS+ OR FIP OR war baseball OR war mlb OR BABIP since:${newdate}`,
      traditional: `era baseball OR era mlb OR "batting average" OR "batting avg" OR slugging baseball OR slugging mlb since: ${newdate}`
    }

    axios.post('/statcast', {
      query: eraQueries[value]
    }).then((response) => {
    }).catch((err) => console.log('there was an error searching twitter'))
  }


  fetchOurData(era) {
    event.preventDefault();
    axios.get(`/${era}`)
      .then((response) => {
        this.setState({
          statcast: response.data
        })
      })
      .catch((err) => {
        console.error('there was an error', err);
      })
  }

  componentDidMount() {
    this.searchTwitter('statcast');
    this.searchTwitter('sabr');
    this.searchTwitter('traditional');
  }
  render() {
    if (this.state.isLoading) {
      return (
        <h3>Hold on just a sec...</h3>
      )
    } else {
    return (
      <div>
        <h1>Battle of Baseball Statics</h1>
        <h4>
          Click the buttons below to show the number of mentions on twitter for each statistical category below
        </h4>
        <ul>
          <li>
            Traditional: {() => this.fetchOurData('traditional')}
            <form onSubmit={this.fetchOurData}>
              <input type="submit" value="find mentions" />
            </form>
            </li>
          <li>
            Sabr: {this.state.sabr}
            <form onSubmit={() => this.fetchOurData('sabr')}>
              <input type="submit" value="find mentions" />
            </form>
          </li>
          <li>
            Statcast: {this.state.statcast}
            <form onSubmit={() => this.fetchOurData('statcast')}>
              <input type="submit" value="find mentions" />
            </form>
          </li>
        </ul>
      </div>
    )}
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();

//each category in the state will be an array of objects that contain
  //stat category and count

  //

