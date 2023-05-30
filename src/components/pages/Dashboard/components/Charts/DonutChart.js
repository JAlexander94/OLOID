import React, { Component } from "react";
import Chart from "react-apexcharts";
import PieData from "../../../../data/portfolio.json"

function calculateSectorTotals(data) {
  const sectorTotals = {};

  data.forEach(item => {
    const sector = item.sector;

    if (sectorTotals.hasOwnProperty(sector)) {
      sectorTotals[sector] += Number(item.amount.OLOID);
    } else {
      sectorTotals[sector] = Number(item.amount.OLOID);
    }
  });

  // Convert the sector totals object to an array of [sector, total] pairs
  const sectorTotalsArray = Object.entries(sectorTotals);

  // Sort the sector totals array based on the total in descending order
  sectorTotalsArray.sort((a, b) => b[1] - a[1]);

  // Extract the sorted sector names and totals as separate arrays
  const sectors = sectorTotalsArray.map(pair => pair[0]);
  const totals = sectorTotalsArray.map(pair => pair[1]);

  return { sectors, totals };
}

const donutChartOptions = {
  tooltip: {
    theme: "dark",
  },
  title: {
    text: "OLOID Sectoral Exposure",
    align: 'top',
    margin: 2,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize:  '14px',
      fontWeight:  'bold',
      color:  '#fff'
    },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            fontSize: "14px",
          },
          value: {
            formatter: function (val) {
              return `${val.toLocaleString(undefined, {
                style: "currency",
                currency: "GBP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}`;
            },
            fontSize: "12px",
            color: "#fff",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              const total = w.globals.seriesTotals.reduce((total, val) => total + val, 0);
              return `${total.toLocaleString(undefined, {
                style: "currency",
                currency: "GBP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}`;
            },
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
          },
        },
      },
    },
  },
  legend: { show: true, labels: { colors: "#fff" }, position: "bottom" },
};

class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { sectors, totals } = calculateSectorTotals(PieData);
  
    this.setState({
      chartData: totals,
      chartOptions: {
        ...donutChartOptions,
        labels: sectors,
      },
    });
  }
  

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="donut"
        width="100%"
        height="100%"
      />
    );
  }
}

export default DonutChart;