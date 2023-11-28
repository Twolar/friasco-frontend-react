import { Box } from "@mui/material";
import Header from "../../components/Header";
import useAuth from "../../hooks/useAuth";
import UserSettingsTabs from "../../components/UserSettingsTabs";

const Settings = () => {
  const { auth } = useAuth();

  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Settings"
          subtitle={`Hi ${auth?.firstName}, welcome to your user settings!`}
        ></Header>
      </Box>

      <Box mt="15px">
        <UserSettingsTabs />
      </Box>
    </Box>
  );
};

export default Settings;
