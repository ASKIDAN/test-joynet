import {
    GET_REPOS_GET_RESPONSE, GET_REPOS_GET_RESPONSE_ERROR, GET_REPOS_SEND_REQUEST, STATUS_DONE,
    STATUS_LOADNING, STATUS_FAILED, GET_COMMITS_SEND_REQUEST, GET_COMMITS_GET_RESPONSE, GET_COMMITS_GET_RESPONSE_ERROR
} from "../constants/constants";

const initialState = {
    status: null,
    repos: [],
    commits: []
};
/*TODO: write reducers*/
const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPOS_SEND_REQUEST :
            let obj = {...state, repos: []};
            return {...obj, status: STATUS_LOADNING};
        case GET_REPOS_GET_RESPONSE  : {
            let repos = JSON.parse(action.payload.data)
            let obj = {...state, repos: repos};
            return {...obj, status: STATUS_DONE};
        }
        case GET_REPOS_GET_RESPONSE_ERROR: {
            let obj = {...state, repos: []};
            return {...obj, status: STATUS_FAILED};
        }
        case GET_COMMITS_SEND_REQUEST : {
            let obj = {...state, commits: []};
            return {...obj, status: STATUS_LOADNING};
        }
        case GET_COMMITS_GET_RESPONSE : {
            let commits = JSON.parse(action.payload.data);
            let obj = {...state, commits: commits};
            return {...obj, status: STATUS_DONE};
        }
        case GET_COMMITS_GET_RESPONSE_ERROR : {
            let obj = {...state, commits: []};
            return {...obj, status: STATUS_FAILED};
        }
    }

    return state;

};

export default mainReducer;