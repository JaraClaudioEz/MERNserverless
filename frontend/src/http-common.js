//This helper file will set up Axios to handle CRUD operations
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/restaurants", //URL from our backend service
    headers: {
        "Content-type": "application/json"
    }
});