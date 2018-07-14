import React from 'react';
import { PieChart, Legend } from 'react-easy-chart';

const DataVisual = (props) => {
  const pieData = [
    {key: 'traditional', value: props.categories.traditional},
    {key: 'sabr', value: props.categories.sabr},
    {key: 'statcast', value: props.categories.statcast}
  ]

  let legendToggle = (props.categories.displayLegend === true) ? <Legend data={pieData} dataId={'key'} horizontal /> : null;

  return (
    <div>
      <PieChart data={pieData} size={300} />
      {legendToggle}
    </div>
  )
};

export default DataVisual