import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface State {
  options: object;
  series: Array<{ name: string; data: number[] }>;
}

export default class ApexChart extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
        },
        xaxis: {
          categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [41, 21, 54, 66, 64, 21, 76, 28, 40, 125, 28],
        },
      ],
    };
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        width= '100%'
        height= '100%'
      />
    );
  }
}
