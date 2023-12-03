import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthenticatedRolesArray } from "../../helpers/userRoleArrays";
import useLogout from "../../hooks/useLogout";
import { SceneRoutePathEnum } from "../../helpers/enums";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate(SceneRoutePathEnum.Login);
  };

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
          <Typography
            variant="h3"
            color={colors.grey[100]}
            onClick={() =>
              navigate(SceneRoutePathEnum.Default, { replace: true })
            }
            style={{ cursor: "pointer" }}
          >
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
          <>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                navigate(SceneRoutePathEnum.Settings, { replace: true })
              }
            >
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={signOut}>
              <LogoutOutlinedIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              onClick={() =>
                navigate(SceneRoutePathEnum.Login, { replace: true })
              }
            >
              <LoginOutlinedIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
