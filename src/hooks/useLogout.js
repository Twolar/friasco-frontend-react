import axios from "../api/axios";
import { ApiUrlEnum } from "../helpers/enums";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      setAuth({});
      const response = await axios.get(ApiUrlEnum.AuthLogout, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
