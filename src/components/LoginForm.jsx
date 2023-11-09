import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext, useEffect, useRef, useState } from "react";
import { tokens } from "../theme";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
const LOGIN_URL = "/login";

const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [errMessage, setErrMessage] = useState(""); // TODO: change the messaging (snackbar?)
  const [success, setSuccess] = useState(false); // TODO: Temporary for test purposes...

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [userEmail, userPassword]);

  const handleFormSubmit = async (formData, { resetForm }) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          Email: formData.email,
          Password: formData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth({
        email: formData.email,
        password: formData.password,
        token: response.data.token,
      });
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMessage("No Server Response");
      } else if (error?.response?.status === 400) {
        setErrMessage(error?.response?.data?.Errors?.Exception[0]);
      } else {
        setErrMessage("Login Failed");
      }

      errRef.current.focus();
    }
  };

  return (
    <Box width="100%">
      {success ? (
        <section>
          <Typography
            variant="p"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            You are logged in!
          </Typography>
        </section>
      ) : (
        <>
          <section>
            <Typography
              variant="p"
              ref={errRef}
              className={errMessage ? "errorMessage" : "hidden"}
              aria-live="assertive"
            >
              {errMessage}
            </Typography>
          </section>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    ref={userRef}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    SUBMIT
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </>
      )}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email address").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "user@example.com",
  password: "string",
};

export default LoginForm;
