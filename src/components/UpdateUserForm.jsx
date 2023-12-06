import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../theme";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ApiUrlEnum } from "../helpers/enums";

const UpdateUserForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const errRef = useRef();

  const [userDetails, setUserDetails] = useState({
    username: auth?.username,
    firstName: auth?.firstName,
    lastName: auth?.lastName,
    email: auth?.email,
  });
  const [formSubmissionInfo, setFormSubmissionInfo] = useState({}); // TODO: change the messaging (snackbar?)

  useEffect(() => {
    setUserDetails({
      username: auth?.username,
      firstName: auth?.firstName,
      lastName: auth?.lastName,
      email: auth?.email,
    });
  }, [auth]);

  useEffect(() => {
    setFormMessage(false, "");
  }, []);

  const setFormMessage = (isSuccess, message) => {
    setFormSubmissionInfo({
      isSuccess,
      message,
    });
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axiosPrivate.put(
        ApiUrlEnum.Users + auth?.id,
        JSON.stringify({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        })
      );

      setAuth((prev) => {
        return {
          ...prev,
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        };
      });
      setFormMessage(true, "Form submission successful!");
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
        setFormMessage(false, "Update Failed");
      }

      errRef.current.focus();
    }
  };

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
          initialValues={userDetails}
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
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  UPDATE
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
  email: yup.string().email("invalid email").required("required"),
  username: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
});

export default UpdateUserForm;
