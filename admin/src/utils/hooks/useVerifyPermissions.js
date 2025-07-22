const { PERSIST_STORE_NAME } = require("constants/app.constant");

const user = localStorage.getItem(PERSIST_STORE_NAME);
const authData = JSON.parse(user)?.auth;
const permissions = JSON.parse(authData)?.session?.permissions;

const useVerifyPermissions = (checkPermissions) => {
  const isPermissionExists = permissions?.some((module) =>
    module.permissions?.some((permission) =>
      checkPermissions.includes(permission.name)
    )
  );
  return isPermissionExists;
};

export default useVerifyPermissions;
