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
import { ApiUrlEnum } from "../helpers/enums";

const ForgottenPasswordForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const emailRef = useRef();
  const errRef = useRef();

  const [formSubmissionInfo, setFormSubmissionInfo] = useState({}); // TODO: change the messaging (snackbar?)

  useEffect(() => {
    emailRef.current.focus();
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
        ApiUrlEnum.AuthForgottenPassword,
        JSON.stringify({
          Email: formData.email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setFormMessage(true, "Form submitted successfully!");
      resetForm();
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
        setFormMessage(false, "Password Reset Failed");
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
                  ref={emailRef}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
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
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email address").required("required"),
});

const initialValues = {
  email: "",
};

export default ForgottenPasswordForm;
