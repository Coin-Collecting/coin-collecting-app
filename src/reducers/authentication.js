import { UPDATE_TOKEN } from '../actions/authentication';
import { UPDATE_USER } from '../actions/authentication';
import { LOGOUT } from '../actions/authentication';

const initialState = {
  token: localStorage.getItem('token'),
  user: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN: {
      localStorage.setItem('token', action.token);

      return {
        token: action.token,
      };
    }

    case LOGOUT: {
      localStorage.removeItem('token');

      return {
        token: undefined,
      };
    }
    case UPDATE_USER: {
      return {
        token: state.token,
        user: action.user,
      };
    }
    default:
      return state;
  }
}
