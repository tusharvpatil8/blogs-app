import dashboardNavigationConfig from "./dashboard.Navigation.Config";
import blogNavigationConfig from "./blog.Navigation.Config"
import configNavigationConfig from "./config.Navigation.Config";

const navigationConfig = [...dashboardNavigationConfig, ...blogNavigationConfig, ...configNavigationConfig];

export default navigationConfig;
