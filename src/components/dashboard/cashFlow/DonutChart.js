import Chart from "react-apexcharts";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";

/**
 * Straight forward component for rendering charts.
 * Apexcharts has a lot of chart variations.
 * Checkout Apexcharts for more information about their chart.
 */
const DonutChart = ({ inMoney, outMoney }) => {
  const { theme } = useThemeProvider();
  const state = {
    series: [inMoney, outMoney],
    chartOptions: {
      labels: ["Debit", "Credit"],
      colors: ["#2196f3", "#f44336"],
      legend: {
        labels: {
          colors: theme === "dark" ? ["white"] : ["black"],
        },
      },
    },
  };
  return (
    <Chart
      options={state.chartOptions}
      series={state.series}
      type="donut"
      width="380"
    />
  );
};

export default DonutChart;
