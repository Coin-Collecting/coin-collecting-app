import { combineReducers } from 'redux'
import token from './token'
import me from './me'

const reducers = combineReducers({
	token,
	me,
});

export default reducers;
