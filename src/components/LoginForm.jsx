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
import { useEffect, useRef, useState } from "react";
import { tokens } from "../theme";
import axios from "../api/axios";
import { decodeToken } from "react-jwt";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiUrlEnum } from "../helpers/enums";

const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { setAuth, persist, setPersist } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [formSubmissionInfo, setFormSubmissionInfo] = useState({}); // TODO: change the messaging (snackbar?)

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setFormMessage(false, "");
  }, []);

  const setFormMessage = (isSuccess, message) => {
    setFormSubmissionInfo({
      isSuccess,
      message,
    });
  };

  const handleFormSubmit = async (formData, { resetForm }) => {
    try {
      const response = await axios.post(
        ApiUrlEnum.AuthLogin,
        JSON.stringify({
          Email: formData.email,
          Password: formData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      var tokenClaims = decodeToken(response?.data?.token);

      setAuth({
        id: tokenClaims.nameid,
        firstName: tokenClaims.given_name,
        lastName: tokenClaims.family_name,
        username: tokenClaims.unique_name,
        email: tokenClaims.email,
        role: tokenClaims.role,
        token: response.data.token,
      });
      setFormMessage(true, "");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setFormMessage(false, "No Server Response");
      } else if (error?.response?.status === 400) {
        setFormMessage(false, error?.response?.data?.Errors?.Exception[0]);
      } else if (error?.response?.status === 401) {
        setFormMessage(
          false,
          error?.response?.data?.Errors?.Exception[0] + " - Unauthorized"
        );
      } else {
        setFormMessage(false, "Login Failed");
      }

      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <Box width="100%" maxWidth="500px">
      <>
        <section>
          <Typography
            variant="p"
            ref={errRef}
            className={formSubmissionInfo.message ? "" : "hidden"}
            aria-live="assertive"
            color={
              formSubmissionInfo.isSuccess
                ? colors.greenAccent[300]
                : colors.redAccent[300]
            }
          >
            {formSubmissionInfo.message}
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
                <div
                  className="persistCheck"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gridColumn: "span 4",
                  }}
                >
                  <input
                    type="checkbox"
                    id="persist"
                    onChange={togglePersist}
                    checked={persist}
                  />
                  <label htmlFor="persist">Trust this device?</label>
                </div>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  SIGN IN
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email address").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "SuperAdminRole@example.com",
  password: "Password123",
};

export default LoginForm;
