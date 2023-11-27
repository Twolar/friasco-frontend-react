import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthenticatedRolesArray } from "../../helpers/userRoleArrays";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn =
    auth?.email && AuthenticatedRolesArray.includes(auth?.role);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {isLoggedIn ? (
        // SEARCH BAR
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"></InputBase>
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      ) : (
        <>
          <Typography variant="h3" color={colors.grey[100]}>
            Friasco
          </Typography>
        </>
      )}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <ModeNightOutlinedIcon />
          )}
        </IconButton>
        {isLoggedIn ? (
          // SEARCH BAR
          <>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </>
        ) : (
          <></>
        )}
        <IconButton onClick={() => navigate("/login", { replace: true })}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
