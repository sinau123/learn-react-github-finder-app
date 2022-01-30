import IUser, { IUserDetail } from "../models/user";

export enum GithubReducerActionKind {
  SET_USERS,
  SET_USER,
  REMOVE_USER,
  SET_LOADING,
  SET_QUERY,
}

interface GithubReducerState {
  users: IUser[];
  user: IUserDetail | null;
  loading: boolean;
  query: string;
}

type SetUsersAction = {
  type: GithubReducerActionKind.SET_USERS;
  payload: IUser[];
};
type SetUserAction = {
  type: GithubReducerActionKind.SET_USER;
  payload: IUserDetail;
};
type RemoveUserAction = { type: GithubReducerActionKind.REMOVE_USER };
type SetLoadingAction = {
  type: GithubReducerActionKind.SET_LOADING;
  payload: boolean;
};
type SetQueryAction = {
  type: GithubReducerActionKind.SET_QUERY;
  payload: string;
};

export type GithubAction =
  | SetUsersAction
  | SetLoadingAction
  | SetUserAction
  | RemoveUserAction
  | SetQueryAction;

const githubReducer = (state: GithubReducerState, action: GithubAction) => {
  switch (action.type) {
    case GithubReducerActionKind.SET_USERS:
      return { ...state, users: action.payload };

    case GithubReducerActionKind.SET_LOADING:
      return { ...state, loading: action.payload };

    case GithubReducerActionKind.REMOVE_USER:
      return { ...state, user: null };

    case GithubReducerActionKind.SET_USER:
      return { ...state, user: action.payload };

    case GithubReducerActionKind.SET_QUERY:
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default githubReducer;
