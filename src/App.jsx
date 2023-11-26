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

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Private User Routes */}
              <Route
                element={<RequireAuth allowedRoles={AuthenticatedRolesArray} />}
              >
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Private Admin Routes */}
              <Route element={<RequireAuth allowedRoles={AdminRolesArray} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Private SuperAdmin Routes */}
              <Route
                element={<RequireAuth allowedRoles={SuperAdminRolesArray} />}
              >
                <Route path="/admin/users" element={<Users />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
