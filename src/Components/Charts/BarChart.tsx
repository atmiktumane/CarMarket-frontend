import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ data }: any) => {
  const chartData = {
    labels: data.map((item: any) => item.carName), // X-axis labels
    datasets: [
      {
        label: "Car Count",
        data: data.map((item: any) => item.count), // Y-axis values
        backgroundColor: "rgba(99, 102, 241, 0.7)", // Indigo-500 with opacity
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Car Listings Analytics",
      },
    },
  };

  return (
    <div className="w-full h-[250px] p-4 bg-white rounded-xl shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
};
