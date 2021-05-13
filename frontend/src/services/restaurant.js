import http from "../http-common";

//Here will be set all the functions that are going to make all api calls
class RestaurantDataService {
    getAll(page = 0) {
        return http.get(`restaurants?page=${page}`);
    }

    get(id) {
        return http.get(`restaurant?id=${id}`); //Realm only acepts query parameter instead a path parameter used in node
    }

    find(query, by = "name", page = 0) { //query is the search term
        return http.get(`restaurants?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/review-new", data);
    }

    updateReview(data) {
        return http.put("/review-edit", data);
    }

    deleteReview(id, userId) { //This is not the best practice to delete data
        return http.delete(`/review-delete?id=${id}`, { data: { user_id: userId } });
    }

    getCuisines(id) {
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();