import axios from 'axios'
import {
    GET_REPOS_GET_RESPONSE, GET_REPOS_GET_RESPONSE_ERROR, GET_REPOS_SEND_REQUEST, URL_GET_REPOS
} from "../constants/constants";

const getRepos = () => {
    return (dispath) => {
        dispath({
            type: GET_REPOS_SEND_REQUEST,
            payload: {}
        });

        axios.get(URL_GET_REPOS)
            .then(result => {
                dispath({
                    type: GET_REPOS_GET_RESPONSE,
                    payload: result
                })
            })
            .catch(result => {
                dispath({
                    type: GET_REPOS_GET_RESPONSE_ERROR,
                    playload: result
                });
            });
    }

};

export default getRepos;