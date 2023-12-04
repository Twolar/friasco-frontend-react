export const UserRoleEnum = {
  User: "User",
  Admin: "Admin",
  SuperAdmin: "SuperAdmin",
};

// Convention to have trailing slash
export const ApiUrlEnum = {
  AuthLogin: "/auth/login/",
  AuthRegister: "/auth/register/",
  AuthChangePassword: "/auth/changepassword/",
  AuthRefresh: "/auth/refresh/",
  AuthLogout: "/auth/logout/",
  AuthLogoutAll: "/auth/logoutall/",
  AuthForgottenPassword: "/auth/forgottenpassword/",
  Users: "/users/",
};

export const SceneRoutePathEnum = {
  Default: "/",
  Login: "/login",
  Dashboard: "/dashboard",
  Profile: "/profile",
  Settings: "/settings",
  Unauthorized: "/unauthorized",
  ForgottenPassword: "/forgottenpassword",
  ADUsers: "/admin/user-management",
};
