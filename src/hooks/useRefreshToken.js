import axios from "../api/axios";
import useAuth from "./useAuth";
import { decodeToken } from "react-jwt";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/Auth/Refresh", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setAuth((prev) => {
      var tokenClaims = decodeToken(response?.data?.token);

      console.log(JSON.stringify(prev));
      console.log("New Token: " + response.data.token);
      console.log(JSON.stringify(tokenClaims));

      return {
        ...prev,
        email: tokenClaims.unique_name,
        role: tokenClaims.role,
        token: response.data.token,
      };
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
