import { Container, Typography } from "@mui/joy";
import TableComponent from "../components/table/table";
import { useTransactions } from "../hooks/useTransactions";

const Dashboard = () => {

    const { data: rows, isLoading, isError } = useTransactions();

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar transacciones</p>;

    return (
        <Container sx={{ minHeight: "100vh", paddingTop: "0rem"}}>
            <Typography level="h3" sx={{ textAlign: "center", paddingTop: "2rem"}}>
                Dashboard
            </Typography>
            <TableComponent rows={ rows || []}/>
        </Container>
    );
}

export default Dashboard;