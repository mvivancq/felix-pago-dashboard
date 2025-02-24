import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/joy";
import Table from "../components/table/Table";
import { useTransactions } from "../hooks/useTransactions";
import Filters from "../components/filters/Filters";
import { Row } from "../types/dashboard";

const Dashboard = () => {
  const { data: rows, isLoading, isError } = useTransactions();
  const [filteredRows, setFilteredRows] = useState<Row[]>(rows || []);

  // Restablecer datos cuando cambian las transacciones
  useEffect(() => {
    setFilteredRows(rows || []);
  }, [rows]);

  const columns = [
    { label: "Transaction Id", value: "transaction_id" as keyof Row },
    { label: "Sender Whatsapp", value: "sender_whatsapp" as keyof Row },
    { label: "Receiver Whatsapp", value: "receiver_whatsapp" as keyof Row },
    { label: "Amount Sent", value: "amount_sent" as keyof Row },
    { label: "Exchange Rate", value: "exchange_rate" as keyof Row },
    { label: "Amount Received", value: "amount_received" as keyof Row },
    { label: "Status", value: "status" as keyof Row },
    { label: "Payment Method", value: "payment_method" as keyof Row },
    { label: "Date", value: "date" as keyof Row },
  ];

  const filterTypes = [
    { label: "Dropdown Filter", value: "dropdown" }, 
    { label: "Text Input", value: "text" }, 
    { label: "Range", value: "range" }, 
    { label: "Date Picker", value: "date" }
  ];

  const handleApplyFilter = (filtered: Row[]) => {
    setFilteredRows(filtered.length > 0 ? filtered : rows || []);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar transacciones</p>;

  return (
    <Container sx={{ minHeight: "100vh", minWidth: "80vw" }}>
      <Typography level="h3" sx={{ textAlign: "center", paddingTop: "2rem" }}>
        Dashboard
      </Typography>
      <Filters columns={columns} filterTypes={filterTypes} rows={rows || []} onFilter={handleApplyFilter} />
      <Table rows={filteredRows} />
    </Container>
  );
};

export default Dashboard;
