import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <Container sx={{ minHeight: "100vh", paddingTop: "0rem"}}>
        <Navbar />
        <Typography variant="h1" align="center">
            Dashboard
        </Typography>
    </Container>
  );
}

export default Dashboard;