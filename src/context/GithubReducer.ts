import IUser from "../models/user";

export enum GithubReducerActionKind {
  SET_USERS,
  SET_LOADING,
}

interface GithubReducerState {
  users: IUser[];
  loading: boolean;
}

type UserAction = { type: GithubReducerActionKind.SET_USERS; payload: IUser[] };
type LoadingAction = {
  type: GithubReducerActionKind.SET_LOADING;
  payload: boolean;
};

type Action = UserAction | LoadingAction;

const githubReducer = (state: GithubReducerState, action: Action) => {
  switch (action.type) {
    case GithubReducerActionKind.SET_USERS:
      return { ...state, users: action.payload };

    case GithubReducerActionKind.SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default githubReducer;
