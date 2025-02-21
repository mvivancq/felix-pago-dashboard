import { Container, Typography } from "@mui/joy";
import Table from "../components/Table/Table";

const Dashboard = () => {


    return (
        <Container sx={{ minHeight: "100vh", paddingTop: "0rem"}}>
            <Typography level="h3" sx={{ textAlign: "center", paddingTop: "2rem"}}>
                Dashboard
            </Typography>
            <Table />
        </Container>
    );
}

export default Dashboard;