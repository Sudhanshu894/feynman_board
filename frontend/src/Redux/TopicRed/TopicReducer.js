import { ALL_TOPICS_FAIL, ALL_TOPICS_REQUEST, ALL_TOPICS_SUCCESS, CREATE_TOPIC_FAIL, CREATE_TOPIC_REQUEST, CREATE_TOPIC_RESET, CREATE_TOPIC_SUCCESS, UPDATE_TOPIC_FAIL, UPDATE_TOPIC_REQUEST, UPDATE_TOPIC_RESET, UPDATE_TOPIC_SUCCESS, TOPIC_DETAILS_FAIL, TOPIC_DETAILS_REQUEST, TOPIC_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_TOPIC_REQUEST, DELETE_TOPIC_RESET, DELETE_TOPIC_FAIL, DELETE_TOPIC_SUCCESS } from "./ActionTypes";


export const TopicReducer = (state = { topics: [] }, action) => {
    switch (action.type) {
        case ALL_TOPICS_REQUEST:
            return {
                loading: true,
                topics: [],
            }
        case ALL_TOPICS_SUCCESS:
            return {
                loading: false,
                topics: action.payload,
            }
        case ALL_TOPICS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const TopicDetailsReducer = (state = { topic: {} }, action) => {
    switch (action.type) {
        case TOPIC_DETAILS_REQUEST:
            return {
                loading: true,
                topic: {},
            };
        case TOPIC_DETAILS_SUCCESS:
            return {
                loading: false,
                topic: action.payload,
            };
        case TOPIC_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};


export const newTopicReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_TOPIC_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_TOPIC_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                topic: action.payload.article,
            };
        case CREATE_TOPIC_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CREATE_TOPIC_RESET:
            return {
                ...state,
                success: false,
                topic: null,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};


export const UpdateTopicReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TOPIC_REQUEST:
        case DELETE_TOPIC_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_TOPIC_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_TOPIC_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_TOPIC_FAIL:
        case DELETE_TOPIC_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case UPDATE_TOPIC_RESET:
            return {
                ...state,
                error: null,
                isUpdated: false,
            }
        case DELETE_TOPIC_RESET:
            return {
                ...state,
                error: null,
                isDeleted: false,
            }
        default:
            return state;
    }
}