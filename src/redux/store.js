import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import teamReducer from './reducers/teamReducer';

const initialState = {};

const reducers = combineReducers({
    user: userReducer,
    team: teamReducer,
    data: dataReducer,
    UI: uiReducer
})

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

export default store;