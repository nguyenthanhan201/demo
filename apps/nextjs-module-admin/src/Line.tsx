import {
  CategoryScale,
  Chart,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { ChartProps, Line as LineChartJs } from "react-chartjs-2";

type LineProps = {
  data: ChartProps["data"];
  options: ChartProps["options"];
};

const Line = (props: LineProps) => {
  return <LineChartJs {...(props as any)} />;
};

export default Line;

export {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
};

export type { ChartOptions, LineProps };
