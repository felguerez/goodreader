import { Dispatch, Reducer, useEffect, useReducer } from "react";

type User = { email?: string };

enum Status {
  IDLE,
  LOADING,
  LOADED,
}
const initialState: State = {
  user: null,
  status: Status.IDLE,
};

const USER_LOADED = "USER_LOADED";
const LOAD_USER = "LOAD_USER";

type Action =
  | { type: typeof USER_LOADED; user: User }
  | { type: typeof LOAD_USER };

type State = { user: null | User; status: Status };
const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case USER_LOADED: {
      return {
        ...state,
        user: action.user,
        status: Status.LOADED,
      };
    }
    case LOAD_USER: {
      return {
        ...state,
        status: Status.LOADING,
      };
    }
    default: {
      return state;
    }
  }
};
export function useUser(): [State, Dispatch<Action>] {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const { status } = state;

  async function loadUser() {
    try {
      let user = {};
      const result = await fetch(`${process.env.REACT_APP_SERVER_API}/user`);
      if (result.ok) {
        user = await result.json();
      }
      dispatch({ type: USER_LOADED, user });
    } catch (e) {
      console.log("error loading user ", e);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (status === Status.LOADING) {
      loadUser();
    }
  }, [status]);

  return [state, dispatch];
}
