import React from 'react';

const NewDay = (props) => (
  <h5>We can fetch new data every 24 hours
    <form onSubmit={(e) => props.clearData(e)}>
      <input type="submit" value="ITS A NEW DAY" />
    </form>
  </h5>
);

export default NewDay