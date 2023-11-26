import { Box } from "@mui/material";
import Header from "../../components/Header";

const Profile = () => {
  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="My Profile"
          subtitle="Welcome to your profile page!"
        ></Header>
      </Box>
    </Box>
  );
};

export default Profile;
