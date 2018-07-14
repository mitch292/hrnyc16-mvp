import React from 'react';

const NewDay = (props) => (
  <h3>We can fetch new data every 24 hours
    <form onSubmit={(e) => props.clearData(e)}>
      <input type="submit" value="ITS A NEW DAY" />
    </form>
  </h3>
);

export default NewDay