import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogoutEverywhere = () => {
  const { setAuth } = useAuth();

  const logoutEverywhere = async () => {
    try {
      setAuth({});
      const response = await axios.get("/auth/logoutall", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return logoutEverywhere;
};

export default useLogoutEverywhere;
