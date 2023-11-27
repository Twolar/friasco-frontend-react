import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/Auth/Refresh", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log("Prev: " + prev);
      console.log("New Token: " + response.data.token);
      return { ...prev, token: response.data.token };
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
