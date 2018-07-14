import React from 'react';

const EraList = (props) => (

  <ul>
  <li>
    Traditional: {props.categories.traditional}
    <form onSubmit={() => props.getData('traditional')}>
      <input type="submit" value="find mentions" />
    </form>
    </li>
  <li>
    Sabr: {props.categories.sabr}
    <form onSubmit={() => props.getData('sabr')}>
      <input type="submit" value="find mentions" />
    </form>
  </li>
  <li>
    Statcast: {props.categories.statcast}
    <form onSubmit={() => props.getData('statcast')}>
      <input type="submit" value="find mentions" />
    </form>
  </li>
</ul>
);

export default EraList