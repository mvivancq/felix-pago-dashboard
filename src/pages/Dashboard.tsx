import { Container, Typography } from "@mui/joy";

const Dashboard = () => {
  return (
    <Container sx={{ minHeight: "100vh", paddingTop: "0rem"}}>
        <Typography level="h1" sx={{ textAlign: "center", paddingTop: "2rem"}}>
            Dashboard
        </Typography>
    </Container>
  );
}

export default Dashboard;