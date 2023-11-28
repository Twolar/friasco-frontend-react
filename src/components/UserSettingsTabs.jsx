import * as React from "react";
import PropTypes from "prop-types";
import { tokens } from "../theme";
import { Box, Typography, Tabs, Tab, useTheme } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import ChangePasswordForm from "../components/ChangePasswordForm"

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "none",
        display: "flex",
        height: "auto",
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
        <Tab label="Security" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box m="0px 0px 15px 0px">
          <Typography variant="h6" color={colors.grey[100]}>
            Update your details:
          </Typography>
        </Box>
          <RegisterForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Box m="0px 0px 15px 0px">
          <Typography variant="h6" color={colors.grey[100]}>
            Change your password
          </Typography>
        </Box>
          <ChangePasswordForm />
      </TabPanel>
    </Box>
  );
}
