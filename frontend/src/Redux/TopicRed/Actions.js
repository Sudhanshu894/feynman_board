import axios from "axios";
import { ALL_TOPICS_FAIL, ALL_TOPICS_REQUEST, ALL_TOPICS_SUCCESS, CREATE_TOPIC_FAIL, CREATE_TOPIC_REQUEST, CREATE_TOPIC_SUCCESS, DELETE_TOPIC_FAIL, DELETE_TOPIC_REQUEST, DELETE_TOPIC_RESET, DELETE_TOPIC_SUCCESS, UPDATE_TOPIC_FAIL, UPDATE_TOPIC_REQUEST, UPDATE_TOPIC_RESET, UPDATE_TOPIC_SUCCESS, TOPIC_DETAILS_FAIL, TOPIC_DETAILS_REQUEST, TOPIC_DETAILS_SUCCESS, CLEAR_ERRORS } from "./ActionTypes";


// action Dispatcher to create new Post on topic
export const CreateTopic = (topic, description) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_TOPIC_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.post(`/feynman-board/api/createpost`, { topic, description }, config);
        console.log(data);
        dispatch({
            type: CREATE_TOPIC_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: CREATE_TOPIC_FAIL,
            payload: err.response.data.error,
        })
    }
}

// action Dispatcher to get all topics relevant to loggedin User
export const getAllTopicsList = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_TOPICS_REQUEST });
        const { data } = await axios.get(`/feynman-board/api/user/alltopics`);
        dispatch({
            type: ALL_TOPICS_SUCCESS,
            payload: data.topics,
        });
    } catch (err) {
        dispatch({
            type: ALL_TOPICS_FAIL,
            payload: err.response.data.error,
        });
    }
}


// action Dispatcher to get topic details
export const getTopicDetails = (topicid) => async (dispatch) => {
    try {
        dispatch({ type: TOPIC_DETAILS_REQUEST });
        const { data } = await axios.get(`/feynman-board/api/user/topic/${topicid}`);

        dispatch({
            type: TOPIC_DETAILS_SUCCESS,
            payload: data.topic,
        })

    } catch (err) {
        dispatch({
            type: TOPIC_DETAILS_FAIL,
            payload: err.response.data.error,
        })
    }
}

// action Dispatcher to Update Topic Details
export const UpdateTopic = (id, topic) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TOPIC_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.patch(`/feynman-board/api/user/topic/${id}`, topic, config);
        console.log(data.response.data.success);
        dispatch({
            type: UPDATE_TOPIC_SUCCESS,
            payload: data.response.data.success,
        });
    } catch (err) {
        if (err.response?.data?.success === true) {
            dispatch({
                type: UPDATE_TOPIC_SUCCESS,
                payload: err.response.data.success,
            })
        } else {
            dispatch({
                type: UPDATE_TOPIC_FAIL,
                payload: err.response.data.error,
            })
        }
    }
}


//action dispatcher to delete Topic
export const deleteTopic = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TOPIC_REQUEST });
        const { data } = await axios.delete(`/feynman-board/api/user/topic/${id}`);

        dispatch({
            type: DELETE_TOPIC_SUCCESS,
            payload: data.success,
        })
    } catch (err) {
        dispatch({ type: DELETE_TOPIC_FAIL, payload: err.response.data.error });
    }
}


// action Dispatcher to clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
};