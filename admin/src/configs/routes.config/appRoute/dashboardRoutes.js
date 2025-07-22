import React from "react";
import { DASHBOARD_PREFIX_PATH } from "constants/route.constant";

// const dashboardPermissionsToCheck = [];

// const isDashboardPermissionExists = dashboardPermissionsToCheck?.some(
//   (permission) => []?.includes(permission)
// );

const dashboardRoutes = [
  {
    key: "apps.dashboard",
    path: `${DASHBOARD_PREFIX_PATH}`,
    component: React.lazy(() => import("views/dashboard")),
    authority: [],
  },
];

export default dashboardRoutes;
