import api from ".";

export const fetchUsers = () => {
  return api.get("/users");
};

export const searchUsers = (q: string) => {
  return api.get("/search/users", { params: { q } });
};

export const getUser = async (login: string) => {
  return api.get(`/users/${login}`);
};
