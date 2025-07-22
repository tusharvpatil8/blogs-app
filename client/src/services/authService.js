import api from "./api";

export const login = (data) => {
  return api.post("/login", data);
};
