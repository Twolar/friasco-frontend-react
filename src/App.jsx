import Topbar from "./scenes/global/TopBar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router";
import Sidebar from "./scenes/global/SideBar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Unauthorized from "./scenes/unauthorized"
import Users from "./scenes/admin/users";
import RequireAuth from "./components/RequireAuth";
import { UserRoleEnum } from "./helpers/enums";

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
              <Route path="/unauthorized" element={<Unauthorized />} />
            
              {/* Private Routes */}
              <Route element={ <RequireAuth allowedRoles={[ UserRoleEnum.SuperAdmin ]} /> }>
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
