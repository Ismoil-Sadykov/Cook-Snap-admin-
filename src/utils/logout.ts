import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logout = (router: AppRouterInstance) => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  router.replace("/login");
};
