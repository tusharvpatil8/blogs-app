import blogRoutes from "./blogRoutes";
import configRoutes from "./configRoutes";
import dashboardRoutes from "./dashboardRoutes";

const appsRoute = [...dashboardRoutes, ...blogRoutes, ...configRoutes];

export default appsRoute;
