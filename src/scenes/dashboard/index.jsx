import { Box } from "@mui/material";
import Header from "../../components/Header";
import Login from "../login";

const Dashboard = () => {
  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to the dashboard!"></Header>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Login />
      </Box>
    </Box>
  );
};

export default Dashboard;
