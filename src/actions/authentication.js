export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_USER = 'UPDATE_USER';

export function updateToken({ token }) {
  return {
    type: UPDATE_TOKEN,
    token,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  }
}