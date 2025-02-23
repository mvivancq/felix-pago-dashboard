import { FC } from "react";
import { Table, Sheet } from "@mui/joy";
import "./Table.css";

interface Row {
  transaction_id: string;
  sender_whatsapp: string;
  receiver_whatsapp: string;
  amount_sent: number;
  exchange_rate: number;
  amount_received: number;
  status: string;
  payment_method: string;
  date: Date;
}

interface TableProps {
  rows: Row[];
}

const TableComponent: FC<TableProps> = ({ rows }) => {
  return (
    <Sheet
      sx={{
        height: "70vh", 
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "90vw", // Evita que la tabla sobresalga del viewport
          overflowX: "auto", // Permite scroll horizontal cuando sea necesario
          overflowY: "auto", // Permite scroll vertical cuando sea necesario
        }}
      >
        <Table
          hoverRow
          stickyHeader
          sx={{
            minWidth: "900px", // Define un ancho mínimo para evitar que las columnas colapsen
            width: "100%", // Permite que la tabla expanda su ancho según el contenido
          }}
        >
          <thead>
            <tr>
              <th className="table-title">Transaction Id</th>
              <th className="table-title">Sender Whatsapp</th>
              <th className="table-title">Receiver Whatsapp</th>
              <th className="table-title">Exchange Rate</th>
              <th className="table-title">Amount Received</th>
              <th className="table-title">Status</th>
              <th className="table-title">Payment Method</th>
              <th className="table-title">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.transaction_id}>
                <td>{row.transaction_id}</td>
                <td>{row.sender_whatsapp}</td>
                <td>{row.receiver_whatsapp}</td>
                <td>{row.exchange_rate}</td>
                <td>{row.amount_received}</td>
                <td>{row.status}</td>
                <td>{row.payment_method}</td>
                <td>
                  {row.date.toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Sheet>
  );
};

export default TableComponent;
