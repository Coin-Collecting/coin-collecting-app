export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export function updateToken({ token }) {
  return {
    type: UPDATE_TOKEN,
    token,
  };
}
