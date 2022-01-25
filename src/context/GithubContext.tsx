import React, { createContext, useReducer } from "react";
import IUser from "../models/user";
import api from "../repositories";
import githubReducer, { GithubReducerActionKind } from "./GithubReducer";

interface IGithubContext {
  users: IUser[];
  fetchUsers: () => void;
  searchUsers: (q: string) => void;
  loading: boolean;
}

const GithubContext = createContext<IGithubContext>({
  users: [],
  fetchUsers: () => {},
  searchUsers: () => {},
  loading: false,
});

export const GithubProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, {
    users: [],
    loading: false,
  });

  const setLoading = (loading: boolean) => {
    dispatch({
      type: GithubReducerActionKind.SET_LOADING,
      payload: loading,
    });
  };

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await api.get("/users");
    dispatch({
      type: GithubReducerActionKind.SET_USERS,
      payload: data,
    });
    setLoading(false);
  };

  const searchUsers = async (q: string) => {
    setLoading(true);
    const { data } = await api.get("/search/users", { params: { q } });
    dispatch({
      type: GithubReducerActionKind.SET_USERS,
      payload: data.items,
    });
    setLoading(false);
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        fetchUsers,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
