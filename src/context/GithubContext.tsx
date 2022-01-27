import React, { createContext, useReducer } from "react";
import IUser, { IUserDetail } from "../models/user";
import api from "../repositories";
import githubReducer, { GithubReducerActionKind } from "./GithubReducer";

interface IGithubContext {
  users: IUser[];
  user: IUserDetail | null;
  fetchUsers: () => void;
  searchUsers: (q: string) => void;
  getUser: (login: string) => void;
  removeUser: () => void;
  loading: boolean;
}

const GithubContext = createContext<IGithubContext>({
  users: [],
  user: null,
  fetchUsers: () => {},
  searchUsers: () => {},
  getUser: () => {},
  removeUser: () => {},
  loading: false,
});

export const GithubProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, {
    users: [],
    user: null,
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

  const getUser = async (login: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/users/${login}`);
      dispatch({
        type: GithubReducerActionKind.SET_USER,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const removeUser = () => {
    dispatch({
      type: GithubReducerActionKind.REMOVE_USER,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        fetchUsers,
        loading: state.loading,
        searchUsers,
        getUser,
        removeUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
