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
import Settings from "./scenes/settings";

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
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route element={<PersistLogin />}>
                {/* Private User Routes */}
                <Route
                  element={
                    <RequireAuth allowedRoles={AuthenticatedRolesArray} />
                  }
                >
                  {/* User and above only routes go here */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
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
                    path="/admin/user-management"
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
