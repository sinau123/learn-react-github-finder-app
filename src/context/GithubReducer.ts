import IUser, { IUserDetail } from "../models/user";

export enum GithubReducerActionKind {
  SET_USERS,
  SET_USER,
  REMOVE_USER,
  SET_LOADING,
}

interface GithubReducerState {
  users: IUser[];
  user: IUserDetail | null;
  loading: boolean;
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

type Action =
  | SetUsersAction
  | SetLoadingAction
  | SetUserAction
  | RemoveUserAction;

const githubReducer = (state: GithubReducerState, action: Action) => {
  switch (action.type) {
    case GithubReducerActionKind.SET_USERS:
      return { ...state, users: action.payload };

    case GithubReducerActionKind.SET_LOADING:
      return { ...state, loading: action.payload };

    case GithubReducerActionKind.REMOVE_USER:
      return { ...state, user: null };

    case GithubReducerActionKind.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default githubReducer;
