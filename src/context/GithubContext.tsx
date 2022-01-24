import React, { createContext, useState } from "react";
import IUser from "../models/user";
import api from "../repositories";

interface IGithubContext {
  users: IUser[];
  fetchUsers: () => void;
  loading: boolean;
}

const GithubContext = createContext<IGithubContext>({
  users: [],
  fetchUsers: () => {},
  loading: false,
});

export const GithubProvider: React.FC = ({ children }) => {
  const [users, setUsers]: [IUser[], (users: IUser[]) => void] = useState<
    IUser[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await api.get("/users");
    setUsers(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider value={{ users, fetchUsers, loading }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
