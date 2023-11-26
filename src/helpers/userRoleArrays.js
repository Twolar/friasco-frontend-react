import { UserRoleEnum } from "./enums";

// All authenticated roles
export const AuthenticatedRolesArray = Object.values(UserRoleEnum);

// Admin & SuperAdmin
export const AdminRolesArray = AuthenticatedRolesArray.filter(
  (role) => role !== UserRoleEnum.User
);

// SuperAdmin
export const SuperAdminRolesArray = [UserRoleEnum.SuperAdmin];
