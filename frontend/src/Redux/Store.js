import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserReducer } from './UserRed/UserReducer';
import { newTopicReducer, TopicDetailsReducer, TopicReducer, UpdateTopicReducer } from './TopicRed/TopicReducer';

const reducer = combineReducers({
    user: UserReducer,
    topics: TopicReducer,
    topic: TopicDetailsReducer,
    newTopic: newTopicReducer,
    uptopic: UpdateTopicReducer,
});

let initalState = {};

const middlewares = [thunk];
const store = createStore(
    reducer, initalState, composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;