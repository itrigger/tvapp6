import axios from "axios";
const setAuthToken = token => {
    console.log('token from AuthContext',token);
    if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
        console.log('axios common header',axios.defaults.headers.common);
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};
export default setAuthToken;
