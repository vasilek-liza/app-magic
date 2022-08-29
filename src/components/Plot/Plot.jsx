import './Plot.scss';
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

export const Plot = ({ plot }) => {

  const data = {
    datasets: [
        {
          data: plot.selectValues,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        }],
    labels: plot.labels
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="plot">
      <Line data={data} options={options} />
    </div>
  );
};