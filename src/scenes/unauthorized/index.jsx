import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Unauthorized"
          subtitle="Sorry you do not have permission to view this page!"
        ></Header>
      </Box>
      <Box display="flex" justifyContent="start" mt="20px">
        <Button onClick={goBack} color="secondary" variant="contained">
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default Unauthorized;
