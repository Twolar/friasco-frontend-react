import { Box } from "@mui/material";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

const Login = () => {
  return (
    <Box m="0px 20px">
      <Header title="LOGIN" subtitle="Welcome to the ReactWebApp!"></Header>
      <LoginForm />

      <Header title="REGISTER" subtitle="Welcome to the ReactWebApp!"></Header>
      <RegisterForm></RegisterForm>
    </Box>
  );
};

export default Login;
