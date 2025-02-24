import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Row } from "../../types/dashboard";

// Datos de ejemplo de las transacciones
const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF7F50"];  // Agregamos un color adicional para "In Progress"

const TransactionChart: React.FC<{ rows: Row[] }> = ({ rows }) => {
  // Crea una función para contar las transacciones por estado
  const getTransactionStatusData = (transactions: Row[]) => {
    const statusCount = { completed: 0, pending: 0, failed: 0, inProgress: 0 };

    transactions.forEach((transaction) => {
      const status = transaction.status.toLowerCase();
      if (status === "completed") {
        statusCount.completed++;
      } else if (status === "pending") {
        statusCount.pending++;
      } else if (status === "failed") {
        statusCount.failed++;
      } else if (status === "in progress") {
        statusCount.inProgress++;
      }
    });

    return [
      { name: "Completed", value: statusCount.completed },
      { name: "Pending", value: statusCount.pending },
      { name: "Failed", value: statusCount.failed },
      { name: "In Progress", value: statusCount.inProgress },  // Nueva categoría In Progress
    ];
  };

  const statusData = getTransactionStatusData(rows);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;
