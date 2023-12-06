import { Box } from "@mui/material";
import Header from "../../../components/Header";
import ADUserGrid from "../../../components/ADUserGrid";

const ADUserManagment = () => {
  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USER MANAGEMENT" subtitle="Manage system users here!" />
      </Box>
      <Box mt="15px">
        <ADUserGrid />
      </Box>
    </Box>
  );
};

export default ADUserManagment;
