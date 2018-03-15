import axios from 'axios'
import {
    GET_COMMITS_GET_RESPONSE, GET_COMMITS_GET_RESPONSE_ERROR, GET_COMMITS_SEND_REQUEST,
    URL_GET_COMMITS
} from "../constants/constants";

const getCommits = (repo) => {
    console.log(repo);
    return (dispath) => {
        dispath({
            type: GET_COMMITS_SEND_REQUEST,
            payload: {}
        });

        axios.get(URL_GET_COMMITS + repo)
            .then(result => {
                dispath({
                    type: GET_COMMITS_GET_RESPONSE,
                    payload: result
                })
            })
            .catch(result => {
                dispath({
                    type: GET_COMMITS_GET_RESPONSE_ERROR,
                    playload: result
                });
            });
    }

};

export default getCommits;