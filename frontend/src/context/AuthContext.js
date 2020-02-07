import axios from "axios";
const setAuthToken = token => {

    console.log('token from AuthContext',token);
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    } else {
        // Delete auth header
        axios.defaults.headers.common.Authorization = '';
    }
};
export default setAuthToken;
