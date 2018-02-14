import { UPDATE_TOKEN } from '../actions/authentication';
import { UPDATE_USER } from '../actions/authentication';

const initialState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('coinUser'),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN: {
      localStorage.setItem('token', action.token);

      return {
        token: action.token,
      };
    }
    case UPDATE_USER: {
      localStorage.setItem('coinUser', action.user);

      return {
        token: state.token,
        user: action.user,
      };
    }
    default:
      return state;
  }
}
