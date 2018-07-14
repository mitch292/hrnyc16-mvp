import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EraList from './EraList.jsx';
import NewDay from './NewDay.jsx';
import DataVisual from './PieChart.jsx';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      traditional: 0,
      sabr: 0,
      statcast: 0,
      displayLegend: false
    }
    this.setState = this.setState.bind(this);
    this.fetchOurData = this.fetchOurData.bind(this);
    this.searchTwitter = this.searchTwitter.bind(this);
    this.newDay = this.newDay.bind(this);
    this.currentDate = this.currentDate.bind(this);
  }

  currentDate() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate() - 1;
    let year = dateObj.getUTCFullYear();
    let newDate = `${year}-${month}-${day}`
    return newDate;
  }


  searchTwitter(value) {

    //create a date for our query
    let date = this.currentDate();
    //each statistical categories query 
    const eraQueries = {
      statcast: `("exit velocity") OR ("exit velo") filter:verified since:${date}`,
      sabr: `(OPS baseball) OR (OPS mlb) filter:verified since:${date}`,
      traditional: `("batting average") OR ("batting avg") filter:verified since:${date}`
    }

    axios.post(`/${value}`, {
      query: eraQueries[value]
    }).then((response) => {
    }).catch((err) => console.log('there was an error searching twitter'))
  }


  fetchOurData(era) {
    event.preventDefault();
    this.setState({
      displayLegend: true
    })
    axios.get(`/${era}`)
      .then((response) => {
        this.setState({
          [era]: response.data
        })
      })
      .catch((err) => {
        console.error('there was an error', err);
      })
  }

  newDay(event) {
    console.log('new day was clicked');
    event.preventDefault()
    this.setState({
      traditional: 'click below',
      sabr: 'click below',
      statcast: 'click below',
    });
    let date = this.currentDate();
    let ourEras = ['statcast', 'sabr', 'traditional']
    
    ourEras.forEach((era) => {
      axios.get(`/${era}`)
      .then((total) => {
        axios.post(`/history/${era}`, {
          count: total,
          today: date
        })
      }).then((response) => {
        axios.get(`/delete/${era}`)
      }).then((response) => {
        this.searchTwitter(`${era}`);
      }).catch((err) => {
        console.error(`there was an error resetting ${era}`, err);
      })
    });

  }

  componentDidMount() {
    this.searchTwitter('statcast');
    this.searchTwitter('sabr');
    this.searchTwitter('traditional');
  }

  render() {
    return (
      <div>
        <PageHeader>
          Battle of the Baseball Statics <br/>
          <small>
            Click the buttons below to show the number of mentions on twitter for each statistical category below
          </small>
        </PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <h4>
                Click the buttons below to show the number of mentions<br/>on twitter for each statistical category below
              </h4>
              <EraList categories={this.state} getData={this.fetchOurData}/>
            </Col>
            <Col xs={6} md={4}>
              <DataVisual categories={this.state} />
            </Col>
          </Row>
        </Grid>

        <NewDay clearData={this.newDay} />

      </div>
    )
  }

}


ReactDOM.render(<App />, document.getElementById('root'));



