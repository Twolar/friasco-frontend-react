import { Box, Typography, useTheme } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { tokens } from "../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SceneRoutePathEnum } from "../helpers/enums";

const AuthenticationForms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [isLogin, setIslogin] = useState(true);

  const toggleLogin = () => {
    setIslogin((prev) => !prev);
  };

  return (
    <Box>
      <Typography
        onClick={toggleLogin}
        color={colors.greenAccent[400]}
        variant="contained"
        style={{ cursor: "pointer" }}
      >
        {isLogin ? (
          <>
            <p>No account? Click here to sign up!</p>
          </>
        ) : (
          <>
            <p>Already have an account? Click here to login!</p>
          </>
        )}
      </Typography>
      {isLogin ? (
        <>
          <LoginForm />{" "}
          <Typography
            onClick={() => navigate(SceneRoutePathEnum.ForgottenPassword)}
            color={colors.greenAccent[400]}
            variant="contained"
            style={{ cursor: "pointer" }}
          >
            Forgot your password?
          </Typography>
        </>
      ) : (
        <RegisterForm />
      )}
    </Box>
  );
};

export default AuthenticationForms;
