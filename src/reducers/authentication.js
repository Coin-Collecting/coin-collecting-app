import { UPDATE_TOKEN } from '../actions/authentication';

const initialState = {
  token: localStorage.getItem('token'),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN: {
      localStorage.setItem('token', action.token);

      return {
        token: action.token,
      };
    }
    default:
      return state;
  }
}
