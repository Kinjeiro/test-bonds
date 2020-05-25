import React, { useMemo } from 'react';
import { ChartConfiguration } from 'chart.js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Graph, { GraphContext } from '../../../../features/feature-graph/components/Graph';

// ======================================================
// MODULE
// ======================================================
import { Bond, BondDatePeriodType, BondGroupBy } from '../model-bond';
import { BondDataRequest } from '../api-bonds';
import { MenuItem } from '@material-ui/core';

function labelValueFormatter(value: number, request: BondDataRequest) {
  switch (request.groupBy) {
    case BondGroupBy.Price: return value.toFixed(2);
    case BondGroupBy.Yield: return value.toFixed(1);
    case BondGroupBy.Spread: return `${(value * 100).toFixed(2)}%`;
  }
}

function getLineConfig(bondDataRequest: BondDataRequest | undefined): ChartConfiguration {
  const {
    data,
    period,
  } = bondDataRequest || {};

  return {
    plugins: [
      // https://chartjs-plugin-datalabels.netlify.app/guide/positioning.html#visibility
      ChartDataLabels
    ],

    type: 'line',
    data: {
      //labels: ['12. 02', '15. 02', '18. 02', '20. 02', '25. 02', '28. 02'],
      datasets: [
        {
          data: data && data.map(([date, value]) => ({
            x: new Date(date),
            y: value,
          })),
          borderColor: '#36A2EB',
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        },
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            // https://www.chartjs.org/docs/latest/axes/cartesian/time.html#display-formats
            type: 'time',
            time: {
              // @ts-ignore
              unit: period === BondDatePeriodType.Max
                ? 'quarter'
                : period && period.toLowerCase(),
              tooltipFormat: 'll',
              displayFormats: {
                month: 'MM.YY'
              }
            },
            //scaleLabel: {
            //  display: true,
            //  labelString: 'Date'
            //}
          }
        ],
        yAxes: [
          {
            //scaleLabel: {
            //  display: true,
            //  labelString: 'value'
            //}
          }
        ]
      },
      //scales: {
      //yAxes: [
      //  {
      //    ticks: {
      //      beginAtZero: true,
      //      min: 0,
      //      max: 400,
      //      stepSize: 100
      //    }
      //  }
      //],
      //xAxes: [
      //  {
      //    display: false
      //  }
      //]
      //}
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: '#E1551C',
          anchor: 'end',
          align: 'end',
          offset: 10,
          formatter: (value/*, context: GraphContext*/) => {
            //return context!.chart.data.datasets[0].data[context.dataIndex].y;
            //return value.y.toFixed(2);
            return labelValueFormatter(value.y, bondDataRequest!);
          },
          display: (context: GraphContext) => {
            const {
              chart: {
                width,
              },
              dataIndex,
            } = context;
            return bondDataRequest?.period === BondDatePeriodType.Max
              ? dataIndex === 0 || dataIndex === (width! - 1) || (dataIndex % Math.round(width! / 10)) === 0
              : 'auto';
          }
        },
      },
    }
  };
}

export interface Props {
  bond: Bond,
  bondDataRequest: BondDataRequest | undefined,
  bondDataRequestFetching: boolean,
  onPeriodChange: (period: BondDatePeriodType) => void,
  onGroupByChange: (groupBy: BondGroupBy) => void,
}

export default function BondGraph(props: Props) {
  const {
    bondDataRequest,
    //bondDataRequestFetching,
    onPeriodChange,
    onGroupByChange,
  } = props;

  const graphConfiguration = useMemo(() => getLineConfig(bondDataRequest), [bondDataRequest]);

  return (
    <div>
      <div>
        <ToggleButtonGroup
          value={bondDataRequest?.period}
          exclusive
          onChange={(event, value) => onPeriodChange(value)}
          aria-label="text alignment"
        >
          {
            Object.values(BondDatePeriodType)
              .map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                >
                  {value}
                </ToggleButton>
              ))
          }
        </ToggleButtonGroup>
      </div>

      <Graph
        configuration={graphConfiguration}
      />

      <div>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={bondDataRequest?.groupBy}
            onChange={(event) => onGroupByChange(event.target.value as BondGroupBy)}
            label="Age"
          >
            {
              Object.values(BondGroupBy)
                .map((groupBy) => (
                  <MenuItem
                    key={groupBy}
                    value={groupBy}
                  >
                    {groupBy}
                  </MenuItem>
                ))
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
