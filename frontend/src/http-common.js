//This helper file will set up Axios to handle CRUD operations
import axios from "axios";

export default axios.create({
    baseURL: "https://webhooks.mongodb-realm.com/api/client/v2.0/app/restorants-reviews-whxii/service/restaurants/incoming_webhook", //URL from Realm service
    headers: {
        "Content-type": "application/json"
    }
});