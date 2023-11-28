import Topbar from "./scenes/global/TopBar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router";
import Sidebar from "./scenes/global/SideBar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Register from "./scenes/register";
import Unauthorized from "./scenes/unauthorized";
import Users from "./scenes/admin/users";
import RequireAuth from "./components/RequireAuth";
import Profile from "./scenes/profile";
import {
  AuthenticatedRolesArray,
  AdminRolesArray,
  SuperAdminRolesArray,
} from "./helpers/userRoleArrays";
import useAuth from "./hooks/useAuth";
import PersistLogin from "./components/persistLogin";
import Landing from "./scenes/landing";

function App() {
  const [theme, colorMode] = useMode();
  const { auth } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {auth?.email ? <Sidebar /> : <></>}
          <main className="content">
            <Topbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route element={<PersistLogin />}>
                {/* Private User Routes */}
                <Route
                  element={
                    <RequireAuth allowedRoles={AuthenticatedRolesArray} />
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Private Admin Routes */}
                <Route
                  element={<RequireAuth allowedRoles={AdminRolesArray} />}
                ></Route>

                {/* Private SuperAdmin Routes */}
                <Route
                  element={<RequireAuth allowedRoles={SuperAdminRolesArray} />}
                >
                  <Route path="/admin/users" element={<Users />} />
                </Route>
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
