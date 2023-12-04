import { Box } from "@mui/material";
import Header from "../../components/Header";
import ForgottenPasswordForm from "../../components/ForgottenPasswordForm";

const ForgottenPassword = () => {
  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Forgotten Password"
          subtitle="Please enter your email below to get a password reset email!"
        ></Header>
      </Box>
      <Box>
        <ForgottenPasswordForm />
      </Box>
    </Box>
  );
};

export default ForgottenPassword;
