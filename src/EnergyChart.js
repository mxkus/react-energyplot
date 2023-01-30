import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function transformEnergyData(data) {
  let d = Object.keys(data).map((k) => ({
    id: k,
    technology: k,
    generation: data[k],
  }));
  d.sort((a, b) => -a.generation + b.generation);
  return d;
}

function EnergyChart(props) {
  return (
    <>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={transformEnergyData(props.energyData)}
          margin={{ top: 0, right: 0, left: 100, bottom: 150 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="technology"
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="generation" fill="#2e8f48" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default EnergyChart;
