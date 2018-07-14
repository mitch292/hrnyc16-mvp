import React from 'react';

const EraList = (props) => (

  <div>
  <h4>
    Traditional: {props.categories.traditional} <br/>
    <small>Batting Average</small>
    <form onSubmit={() => props.getData('traditional')}>
      <input type="submit" value="find mentions" />
    </form>
    </h4>
  <h4>
    Sabr: {props.categories.sabr} <br/>
    <small>OPS</small>
    <form onSubmit={() => props.getData('sabr')}>
      <input type="submit" value="find mentions" />
    </form>
  </h4>
  <h4>
    Statcast: {props.categories.statcast} <br/>
    <small>Exit Velocity</small>
    <form onSubmit={() => props.getData('statcast')}>
      <input type="submit" value="find mentions" />
    </form>
  </h4>
</div>
);

export default EraList