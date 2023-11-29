import axios from "../api/axios";
import { ApiUrlEnum } from "../helpers/enums";
import useAuth from "./useAuth";

const useLogoutEverywhere = () => {
  const { setAuth } = useAuth();

  const logoutEverywhere = async () => {
    try {
      setAuth({});
      const response = await axios.get(ApiUrlEnum.AuthLogoutAll, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return logoutEverywhere;
};

export default useLogoutEverywhere;
