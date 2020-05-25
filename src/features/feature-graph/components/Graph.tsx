import React, { Component } from 'react';
import Chart, { ChartConfiguration, ChartDataSets } from 'chart.js';

export interface GraphContext {
  chart: Chart
  dataIndex: number
  dataset: ChartDataSets
  datasetIndex: number
}

interface GraphProps {
  configuration: ChartConfiguration;
}

export default class Graph extends Component<GraphProps> {
  chartInstance: Chart | null = null;
  chartRef = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    const {
      configuration,
    } = this.props;

    this.chartInstance = new Chart(this.chartRef.current!, configuration);
  }

  componentDidUpdate(prevProps: Readonly<GraphProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const {
      configuration,
    } = this.props;
    if (configuration !== prevProps.configuration) {
      this.chartInstance!.config = configuration;
      this.chartInstance!.update();
    }
  }

  render() {
    return (
      <div>
        <canvas ref={ this.chartRef } />
      </div>
    );
  }
}
