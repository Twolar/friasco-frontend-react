import axios from "../api/axios";
import { ApiUrlEnum } from "../helpers/enums";
import useAuth from "./useAuth";
import { decodeToken } from "react-jwt";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(ApiUrlEnum.AuthRefresh, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setAuth((prev) => {
      var tokenClaims = decodeToken(response?.data?.token);

      return {
        ...prev,
        id: tokenClaims.nameid,
        firstName: tokenClaims.given_name,
        lastName: tokenClaims.family_name,
        username: tokenClaims.unique_name,
        email: tokenClaims.email,
        role: tokenClaims.role,
        token: response.data.token,
      };
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
