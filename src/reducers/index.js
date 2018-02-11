import { combineReducers } from 'redux';

import authentication from './authentication';

// Combine the subreducers and export them
export default combineReducers({
  authentication,
});
