import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [userEmail, setUserEmail] = useState("user@example.com");
  const [userPassword, setUserPassword] = useState("string");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [userEmail, userPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userEmail, userPassword);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          Email: userEmail,
          Password: userPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      const token = response.data.token;
      setAuth({ userEmail, userPassword, token });
      setUserEmail();
      setUserPassword();
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
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="LOGIN" subtitle="Welcome to the ReactWebApp!"></Header>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        {success ? (
          <section>
            <p>You are logged in!</p>
          </section>
        ) : (
          <>
            <section>
              <p
                ref={errRef}
                className={errMessage ? "errorMessage" : "hidden"}
                aria-live="assertive"
              >
                {errMessage}
              </p>
            </section>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail} // TODO: Change me
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword} // TODO: Change me
                required
              />

              <button>SUBMIT</button>
            </form>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Login;
