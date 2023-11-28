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
import { axiosPrivate } from "../api/axios";

const RESET_PW_URL = "/auth/resetpassword";

const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const errRef = useRef();

  const [errMessage, setErrMessage] = useState(""); // TODO: change the messaging (snackbar?)

  useEffect(() => {
    setErrMessage("");
  }, []);

  const handleFormSubmit = async (formData, { resetForm }) => {
    try {
      const response = await axiosPrivate.post(
        RESET_PW_URL,
        JSON.stringify({
          password: formData.password,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      resetForm();
    } catch (error) {
      if (!error?.response) {
        setErrMessage("No Server Response");
      } else if (error?.response?.status === 400) {
        setErrMessage(error?.response?.data?.Errors?.Exception[0]);
      } else if (error?.response?.status === 401) {
        setErrMessage(
          error?.response?.data?.Errors?.Exception[0] + " - Unauthorized"
        );
      } else {
        setErrMessage("Password Reset Failed");
      }

      errRef.current.focus();
    }
  };

  return (
    <Box width="100%">
      <>
        <section>
          <Typography
            variant="p"
            ref={errRef}
            className={errMessage ? "errorMessage" : "hidden"}
            aria-live="assertive"
            color={colors.redAccent[300]}
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
                  type="password"
                  label="Current Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name="newPassword"
                  error={!!touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmNewPassword}
                  name="confirmNewPassword"
                  error={!!touched.confirmNewPassword && !!errors.confirmNewPassword}
                  helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  RESET
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
  password: yup.string().required("required"),
  newPassword: yup.string().required("required"),
  confirmNewPassword: yup
  .string()
  .oneOf([yup.ref("newPassword"), null], "New passwords must match")
  .required("required"),
});

const initialValues = {
  password: "",
  newPassword: "",
  confirmNewPassword: ""
};

export default LoginForm;
