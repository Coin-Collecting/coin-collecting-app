export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT = 'LOGOUT';

export function updateToken({ token }) {
  return {
    type: UPDATE_TOKEN,
    token,
  };
}

export function logout( ) {
  return {
    type: LOGOUT,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  }
}