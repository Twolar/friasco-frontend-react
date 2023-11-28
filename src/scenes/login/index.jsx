import { Box } from "@mui/material";
import Header from "../../components/Header";
import AuthenticationForms from "../../components/AuthenticationForms";

const Login = () => {
  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Login"
          subtitle="Log into your account or create a new one!"
        ></Header>
      </Box>
      <Box>
        <AuthenticationForms />
      </Box>
    </Box>
  );
};

export default Login;
