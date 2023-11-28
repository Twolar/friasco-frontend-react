import { Box } from "@mui/material";
import Header from "../../components/Header";

const Landing = () => {
  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Welcome" subtitle="Welcome to Frisaco"></Header>
      </Box>

      <Box>
        <p>This is the landing page, more content to come here soon...</p>
      </Box>
    </Box>
  );
};

export default Landing;
