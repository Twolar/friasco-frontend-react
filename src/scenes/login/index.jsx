import { Box } from "@mui/material";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <Box m="0px 20px">
      <Header title="LOGIN" subtitle="Welcome to the ReactWebApp!"></Header>
      <LoginForm />
    </Box>
  );
};

export default Login;
