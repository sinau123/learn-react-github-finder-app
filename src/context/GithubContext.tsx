import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import IUser, { IUserDetail } from "../models/user";
import api from "../repositories";
import githubReducer, {
  GithubAction,
  GithubReducerActionKind,
} from "./GithubReducer";

interface IGithubContext {
  users: IUser[];
  user: IUserDetail | null;
  loading: boolean;
  query: string;
  dispatch: React.Dispatch<GithubAction>;
}

const GithubContext = createContext<IGithubContext>({} as IGithubContext);

export const GithubProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, {
    users: [],
    user: null,
    loading: true,
    query: "",
  });

  return (
    <GithubContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GithubContext.Provider>
  );
};

function useGithub() {
  const context = useContext(GithubContext);

  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }

  const { dispatch } = context;

  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch({
        type: GithubReducerActionKind.SET_LOADING,
        payload: loading,
      });
    },
    [dispatch]
  );

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get("/users");
    dispatch({
      type: GithubReducerActionKind.SET_USERS,
      payload: data,
    });
    setLoading(false);
  }, [setLoading, dispatch]);

  const searchUsers = useCallback(
    async (q: string) => {
      setLoading(true);
      const { data } = await api.get("/search/users", { params: { q } });
      dispatch({
        type: GithubReducerActionKind.SET_USERS,
        payload: data.items,
      });
      setLoading(false);
    },
    [setLoading, dispatch]
  );

  const getUser = useCallback(
    async (login: string) => {
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
    },
    [setLoading, dispatch]
  );

  const removeUser = () => {
    dispatch({
      type: GithubReducerActionKind.REMOVE_USER,
    });
  };

  const setQuery = useCallback(
    (query: string) => {
      dispatch({
        type: GithubReducerActionKind.SET_QUERY,
        payload: query,
      });
    },
    [dispatch]
  );

  return {
    ...context,
    fetchUsers,
    getUser,
    searchUsers,
    removeUser,
    setQuery,
  };
}

export default useGithub;
