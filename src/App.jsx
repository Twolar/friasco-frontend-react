import Topbar from "./scenes/global/TopBar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router";
import SideBar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Unauthorized from "./scenes/unauthorized";
import UserManagement from "./scenes/admin/userManagment";
import RequireAuth from "./components/RequireAuth";
import Profile from "./scenes/profile";
import Missing from "./scenes/missing";
import {
  AuthenticatedRolesArray,
  AdminRolesArray,
  SuperAdminRolesArray,
} from "./helpers/userRoleArrays";
import useAuth from "./hooks/useAuth";
import PersistLogin from "./components/persistLogin";
import Landing from "./scenes/landing";
import Login from "./scenes/login";
import Settings from "./scenes/userSettings";
import { SceneRoutePathEnum } from "./helpers/enums";
import ForgottenPassword from "./scenes/forgottenPassword";

function App() {
  const [theme, colorMode] = useMode();
  const { auth } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {auth?.email ? <SideBar /> : <></>}
          <main className="content">
            <Topbar />
            <Routes>
              {/* Public Routes */}
              <Route path={SceneRoutePathEnum.Default} element={<Landing />} />
              <Route path={SceneRoutePathEnum.Login} element={<Login />} />
              <Route
                path={SceneRoutePathEnum.ForgottenPassword}
                element={<ForgottenPassword />}
              />
              <Route
                path={SceneRoutePathEnum.Unauthorized}
                element={<Unauthorized />}
              />

              <Route element={<PersistLogin />}>
                {/* Private User Routes */}
                <Route
                  element={
                    <RequireAuth allowedRoles={AuthenticatedRolesArray} />
                  }
                >
                  {/* User and above only routes go here */}
                  <Route
                    path={SceneRoutePathEnum.Dashboard}
                    element={<Dashboard />}
                  />
                  <Route
                    path={SceneRoutePathEnum.Profile}
                    element={<Profile />}
                  />
                  <Route
                    path={SceneRoutePathEnum.Settings}
                    element={<Settings />}
                  />
                </Route>

                {/* Private Admin Routes */}
                <Route element={<RequireAuth allowedRoles={AdminRolesArray} />}>
                  {/* Admin and above only routes go here */}
                </Route>

                {/* Private SuperAdmin Routes */}
                <Route
                  element={<RequireAuth allowedRoles={SuperAdminRolesArray} />}
                >
                  {/* SuperAdmin only routes go here */}
                  <Route
                    path={SceneRoutePathEnum.ADUsers}
                    element={<UserManagement />}
                  />
                </Route>

                {/* 404 */}
                <Route path="*" element={<Missing />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
