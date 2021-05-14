import http from "../http-common";

//Here will be set all the functions that are going to make all the api calls
class RestaurantDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`); //Here we use path parameter
    }

    find(query, by = "name", page = 0) { //query is the search term
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/review", data);
    }

    updateReview(data) {
        return http.put("/review", data);
    }

    deleteReview(id, userId) { //This is not the best practice to delete data
        return http.delete(`/review-delete?id=${id}`, { data: { user_id: userId } });
    }

    getCuisines(id) {
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();