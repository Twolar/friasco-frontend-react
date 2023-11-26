import { Box } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  // TODO: Figure out site flow i.e.
  //    Have it so sidebar etc aren't shown until some form of login or?

  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to the dashboard!"></Header>
      </Box>
    </Box>
  );
};

export default Dashboard;
