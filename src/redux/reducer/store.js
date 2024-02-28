// import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import holderReducer from './Holder';
// import ConnectionReducer from './ConnectionReducer';

// const rootReducer = combineReducers({
//   holder: holderReducer,
//   connectionModal: ConnectionReducer,
// });

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

// const store = createStore(rootReducer, composedEnhancer);
// export default store;

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import holderReducer from './Holder';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(holderReducer, composedEnhancer);
export default store;
