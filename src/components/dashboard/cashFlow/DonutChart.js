import Chart from "react-apexcharts";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
import { toCurrency } from "../../accounts/chartOfAccounts/ChartOfAccounts";

/**
 * Straight forward component for rendering charts.
 * Apexcharts has a lot of chart variations.
 * For more information, please checkout Apexcharts documentation.
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
        position: "bottom",
      },
      stroke: {
        colors: theme === "dark" ? ["white"] : ["#595959"],
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return toCurrency.format(val);
          },
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
