import { FC, useState, useEffect } from "react";
import { Table, Sheet, Button } from "@mui/joy";
import { tableDate, formatUSD } from "../../utils/tableUtils";
import { Row } from "../../types/dashboard";
import "./Table.css";

interface TableProps {
  rows: Row[];
}

const TableComponent: FC<TableProps> = ({ rows }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10; 

  useEffect(() => {
    setCurrentPage(0);
  }, [rows]);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const paginatedRows = rows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <Sheet
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "90vw",
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <Table
          hoverRow
          stickyHeader
          sx={{
            minWidth: "900px",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th className="table-title">Transaction Id</th>
              <th className="table-title">Sender Whatsapp</th>
              <th className="table-title">Receiver Whatsapp</th>
              <th className="table-title">Amount Sent</th>
              <th className="table-title">Exchange Rate</th>
              <th className="table-title">Amount Received</th>
              <th className="table-title">Status</th>
              <th className="table-title">Payment Method</th>
              <th className="table-title">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={row.transaction_id}>
                <td>{row.transaction_id}</td>
                <td>{row.sender_whatsapp}</td>
                <td>{row.receiver_whatsapp}</td>
                <td>{formatUSD(row.amount_sent)}</td>
                <td>{formatUSD(row.exchange_rate)}</td>
                <td>{formatUSD(row.amount_received)}</td>
                <td>{row.status}</td>
                <td>{row.payment_method}</td>
                <td>{tableDate(row.date)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Controles de Paginación */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "10px" }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 0}>
          Anterior
        </Button>

        <span>Página {currentPage + 1} de {totalPages}</span>

        <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
          Siguiente
        </Button>
      </div>
    </Sheet>
  );
};

export default TableComponent;

