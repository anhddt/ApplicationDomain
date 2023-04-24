import Chart from "react-apexcharts";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";

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
