import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ data }: any) => {
  const chartData = {
    labels: data.map((item: any) => item.key), // ["active", "inactive"]
    datasets: [
      {
        label: "Count",
        data: data.map((item: any) => item.count), // [10, 0]
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)", // green-500 for active
          "rgba(239, 68, 68, 0.7)", // red-500 for inactive
        ],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
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
        text: "Active vs Inactive Status",
      },
    },
  };

  return (
    <div className="w-full h-[250px] flex place-content-center bg-white p-4 rounded-xl shadow-md">
      <Pie data={chartData} options={options} />
    </div>
  );
};
