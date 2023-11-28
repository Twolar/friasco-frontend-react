import { Box, Typography, useTheme } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { tokens } from "../theme";
import { useState } from "react";

const AuthenticationForms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            <p>No account, click here to sign up!</p>
          </>
        ) : (
          <>
            <p>Have an account? Click here to login!</p>
          </>
        )}
      </Typography>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </Box>
  );
};

export default AuthenticationForms;
