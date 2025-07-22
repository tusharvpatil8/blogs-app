import React from "react";
import { BLOG_ADD_PREFIX_PATH, BLOG_EDIT_PREFIX_PATH, BLOGS_PREFIX_PATH } from "constants/route.constant";

// const dashboardPermissionsToCheck = [];

// const isDashboardPermissionExists = dashboardPermissionsToCheck?.some(
//   (permission) => []?.includes(permission)
// );

const blogRoutes = [
  {
    key: "apps.blogs",
    path: `${BLOGS_PREFIX_PATH}`,
    component: React.lazy(() => import("views/blogs")),
    authority: [],
  },
    {
    key: 'apps.addBlog',
    path: `${BLOGS_PREFIX_PATH}${BLOG_ADD_PREFIX_PATH}`,
    component: React.lazy(() =>
      import('views/blogs/components/AddBlog')
    ),
    authority: [],
  },

  {
    key: 'apps.editBlog',
    path: `${BLOGS_PREFIX_PATH}${BLOG_EDIT_PREFIX_PATH}/:id`,
    component: React.lazy(() => import('views/blogs/components/EditBlog')),
    authority: [],
  },
];

export default blogRoutes;
