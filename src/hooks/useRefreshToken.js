import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post("/Auth/Refresh",
      JSON.stringify({
        token: auth.token,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      return { ...prev, token: response.data.token };
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
