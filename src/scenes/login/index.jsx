import { Box } from "@mui/material";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const Login = () => {

  // TODO: create dedicated login/register page
  // TODO: create modal for login/register (and link it to user icon button?)

  return (
    <Box m="0px 20px">
      <Header title="LOGIN" subtitle="Welcome to the ReactWebApp!"></Header>
      <LoginForm />
    </Box>
  );
};

export default Login;
