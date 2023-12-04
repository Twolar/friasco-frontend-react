import * as React from "react";
import PropTypes from "prop-types";
import { tokens } from "../theme";
import { Box, Button, Typography, Tabs, Tab, useTheme } from "@mui/material";
import ChangePasswordForm from "../components/ChangePasswordForm";
import UpdateUserForm from "./UpdateUserForm";
import useLogoutEverywhere from "../hooks/useLogoutEverywhere";
import { SceneRoutePathEnum } from "../helpers/enums";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: "12.5px 15px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState(0);
  const logoutEverywhere = useLogoutEverywhere();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signOutEverywhere = async () => {
    await logoutEverywhere();
    navigate(SceneRoutePathEnum.Login);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "none",
        display: "flex",
        height: "100%",
        "& .Mui-selected": {
          color: `${colors.greenAccent[400]} !important`,
        },
        "& .MuiTabs-indicator": {
          backgroundColor: `${colors.greenAccent[500]} !important`,
        },
        '& [role="tabpanel"]': {
          width: "100%",
        },
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="My Details" {...a11yProps(0)} />
        <Tab label="Password" {...a11yProps(1)} />
        <Tab label="Logins" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box m="0px 0px 15px 0px">
          <Typography variant="h6" color={colors.grey[100]}>
            Update your details
          </Typography>
        </Box>
        <UpdateUserForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box m="0px 0px 15px 0px">
          <Typography variant="h6" color={colors.grey[100]}>
            Change your password
          </Typography>
        </Box>
        <ChangePasswordForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box m="0px 0px 15px 0px">
          <Typography variant="h6" color={colors.grey[100]}>
            Manage your logins
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={signOutEverywhere}
            color="secondary"
            variant="contained"
          >
            Log me out everywhere
          </Button>
        </Box>
      </TabPanel>
    </Box>
  );
}
