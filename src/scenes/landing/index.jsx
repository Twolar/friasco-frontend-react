import { Box } from "@mui/material";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

const Landing = () => {
  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Welcome" subtitle="Welcome to Frisaco"></Header>
      </Box>

      <Header title="LOGIN" subtitle="Welcome to the ReactWebApp!"></Header>
      <LoginForm />

      <Header title="REGISTER" subtitle="Welcome to the ReactWebApp!"></Header>
      <RegisterForm />
    </Box>
  );
};

export default Landing;
