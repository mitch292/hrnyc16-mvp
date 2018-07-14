import React from 'react';
import {PieChart} from 'react-easy-chart';
import {Legend} from 'react-easy-chart';

const DataVisual = (props) => {
  const pieData = [
    {key: 'traditional', value: props.categories.traditional},
    {key: 'sabr', value: props.categories.sabr},
    {key: 'statcast', value: props.categories.statcast}
  ]

  return (
    <div>
      <PieChart data={pieData} size={300} />
      <Legend data={pieData} dataId={'key'} horizontal />
    </div>
  )
};

export default DataVisual