import { PERSIST_STORE_NAME } from "constants/app.constant";
import { ADMIN } from "constants/roles.constant";

const user = localStorage.getItem(PERSIST_STORE_NAME);
const authData = JSON.parse(user)?.auth;
const role = JSON.parse(authData)?.user?.role;

const useRoleCheck = () => {
  let isAdmin = false;
  if (role === ADMIN) {
    isAdmin = true;
  }
  return { isAdmin };
};

export default useRoleCheck;
