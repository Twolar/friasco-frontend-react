import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import ForgottenPasswordForm from "../../components/ForgottenPasswordForm";
import { useNavigate } from "react-router-dom";
import { SceneRoutePathEnum } from "../../helpers/enums";
import { tokens } from "../../theme";

const ForgottenPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

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
        <Typography
          onClick={() => navigate(SceneRoutePathEnum.Login)}
          color={colors.greenAccent[400]}
          variant="contained"
          style={{ cursor: "pointer" }}
        >
          Back to login
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgottenPassword;
