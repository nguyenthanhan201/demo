/// <reference types="react" />
import { CategoryScale, Chart, ChartOptions, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { ChartProps } from "react-chartjs-2";
type LineProps = {
    data: ChartProps["data"];
    options: ChartProps["options"];
};
declare const Line: (props: LineProps) => import("react").JSX.Element;
export default Line;
export { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip, };
export type { ChartOptions, LineProps };
//# sourceMappingURL=Line.d.ts.map