import React from "react";
import ReactApexChart from "react-apexcharts";
import {Data} from "../../../../data/portfolios"

const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
      const seriesName = w.globals.seriesNames[seriesIndex];
      const lineTitle = seriesName + ": ";

      const formattedValue = "£" + value.toLocaleString("en-GB"); // Format the value with pounds symbol and comma separation

      return lineTitle + formattedValue;
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "stepline",
  },
  xaxis: {
    type: "datetime",
    axisTicks: {
      show: true
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
      formatter: function (value, timestamp) {
        if (isNaN(timestamp)) {
          return ""; // Return empty string when timestamp is NaN
        }
        
        const date = new Date(timestamp);
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        return month + " " + year;
      },
    },
  },  
  yaxis: {
    labels: {
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
      formatter: function (value) {
        return "£" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format the value with pounds symbol and comma separation
      },
    },
  },
  
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "center",
    labels: {
      colors: "#fff",
    },
  },   
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#fff"],
  },
  colors: ["#fff", "#3182CE","#000","#B8D8BE","#333"],
};

function transformData(data, user) {
  const result = [];
  const useData = data[user];

  ['Commitment', 'Contributions', 'Market Value', 'Distributions'].forEach(
    (key) => {
      let cumulativeAmount = 0;

      const transformed = {
        name: key,
        data: useData[key].map((item) => {
          cumulativeAmount += item.amount;

          return {
            x: new Date(item.date).getTime(),
            y: cumulativeAmount,
          };
        }),
      };
      result.push(transformed);
    }
  );

  // Merge 'Market Value' and 'Distributions'
  const merged = [
    ...useData['Market Value'],
    ...useData['Distributions'],
  ].reduce((acc, cur) => {
    const existing = acc.find((a) => a.date === cur.date);
    if (existing) {
      existing.amount += cur.amount;
    } else {
      acc.push({ ...cur });
    }
    return acc;
  }, []);

  // Sort merged array by date
  merged.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Compute 'Total Value' with cumulative amounts
  let cumulativeAmount = 0;
  const totalValue = {
    name: 'Total Value',
    data: merged.map((item) => {
      cumulativeAmount += item.amount;

      return {
        x: new Date(item.date).getTime(),
        y: cumulativeAmount,
      };
    }),
  };

  result.push(totalValue);

  return result;
}

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      chartData: transformData(Data, user),
      chartOptions: lineChartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;