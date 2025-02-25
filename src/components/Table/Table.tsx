import { FC, useState, useEffect } from "react";
import { Table, Sheet, Button, Menu, MenuItem } from "@mui/joy";
import Pagination from "@mui/material/Pagination"; 
import { Row } from "../../types/dashboard";
import { tableDate, formatUSD } from "../../utils/tableUtils";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ModalTransaction from "../modal/ModalTransaction";  // Importamos el modal de transacción

interface TableProps {
  rows: Row[];
}

const columnsConfig = [
  { label: "Transaction ID", key: "transaction_id" },
  { label: "Sender Whatsapp", key: "sender_whatsapp" },
  { label: "Receiver Whatsapp", key: "receiver_whatsapp" },
  { label: "Amount Sent", key: "amount_sent" },
  { label: "Exchange Rate", key: "exchange_rate" },
  { label: "Amount Received", key: "amount_received" },
  { label: "Status", key: "status" },
  { label: "Payment Method", key: "payment_method" },
  { label: "Date", key: "date" },
];

const TableComponent: FC<TableProps> = ({ rows }) => {
  const [visibleColumns, setVisibleColumns] = useState(
    columnsConfig.reduce((acc, col) => ({ ...acc, [col.key]: true }), {} as Record<string, boolean>)
  );
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false); // Estado para el modal
  const [selectedTransaction, setSelectedTransaction] = useState<Row | null>(null); // Estado para la transacción seleccionada

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget)); // Toggle el menú
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
    handleCloseMenu(); // Cierra el menú después de hacer clic en una opción
  };

  const handlePageChange = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  // Abre el modal con los detalles de la transacción
  const handleOpenModal = (row: Row) => {
    setSelectedTransaction(row); // Guarda la transacción seleccionada
    setOpenModal(true); // Abre el modal
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null); // Limpia la transacción seleccionada
  };

    // Resetea la página cuando los filtros cambian
  useEffect(() => {
    setPage(1); 
  }, [rows]);

  return (
    <Sheet
      sx={{
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "20px",
        backgroundColor: "transparent",
      }}
    >
      {/* Opciones de columnas */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button
          startDecorator={<SettingsIcon />}
          variant="outlined"
          color="primary"
          onClick={handleOpenMenu}
        >
          Customize Columns
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          {columnsConfig.map((col) => (
            <MenuItem key={col.key} onClick={() => handleToggleColumn(col.key)}>
              {visibleColumns[col.key] ? <VisibilityOffIcon /> : <VisibilityIcon />}
              {col.label}
            </MenuItem>
          ))}
        </Menu>
      </div>

      {/* Tabla */}
      <div style={{ overflowX: "auto", flexGrow: 1 }}>
        <Table
          hoverRow
          stickyHeader
          sx={{
            minWidth: "1000px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <thead style={{ backgroundColor: "#f4f4f4" }}>
            <tr>
              {columnsConfig.map(
                (col) =>
                  visibleColumns[col.key] && (
                    <th
                      key={col.key}
                      style={{
                        padding: "12px",
                        minWidth: "120px",
                        textAlign: "center",
                      }}
                    >
                      {col.label}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
              <tr
                key={row.transaction_id}
                style={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => handleOpenModal(row)} // Abre el modal al hacer clic
              >
                {visibleColumns["transaction_id"] && <td style={{ textAlign: "center" }}>{row.transaction_id}</td>}
                {visibleColumns["sender_whatsapp"] && <td style={{ textAlign: "center" }}>{row.sender_whatsapp}</td>}
                {visibleColumns["receiver_whatsapp"] && <td style={{ textAlign: "center" }}>{row.receiver_whatsapp}</td>}
                {visibleColumns["amount_sent"] && <td style={{ textAlign: "center" }}>{formatUSD(row.amount_sent)}</td>}
                {visibleColumns["exchange_rate"] && <td style={{ textAlign: "center" }}>{formatUSD(row.exchange_rate)}</td>}
                {visibleColumns["amount_received"] && <td style={{ textAlign: "center" }}>{formatUSD(row.amount_received)}</td>}
                {visibleColumns["status"] && (
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color:
                        row.status.toLowerCase() === "completed"
                          ? "green"
                          : row.status.toLowerCase() === "pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {row.status}
                  </td>
                )}
                {visibleColumns["payment_method"] && <td style={{ textAlign: "center" }}>{row.payment_method}</td>}
                {visibleColumns["date"] && <td style={{ textAlign: "center" }}>{tableDate(row.date)}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Paginación */}
      <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="large"
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      />

      {/* Modal para ver los detalles de la transacción */}
      <ModalTransaction open={openModal} transaction={selectedTransaction} onClose={handleCloseModal} />
    </Sheet>
  );
};

export default TableComponent;
