import IUser from "../models/user";

export enum GithubReducerActionKind {
  SET_USERS = "setUsers",
  SET_LOADING = "setLoading",
}

interface GithubReducerState {
  users?: IUser[];
  loading?: boolean;
}

interface Action {
  type: GithubReducerActionKind;
  payload: GithubReducerState;
}

const githubReducer = (state: GithubReducerState, action: Action) => {
  switch (action.type) {
    case GithubReducerActionKind.SET_USERS:
      return { ...state, users: action.payload.users };

    case GithubReducerActionKind.SET_LOADING:
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};

export default githubReducer;
