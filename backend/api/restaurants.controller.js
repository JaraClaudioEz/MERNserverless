import RestaurantsDAO from "../dao/restaurantsDAO"

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next){
        //To set parameters from the query string if they exist or not. Parameters are: restaurantsPerPage, page and filters
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        let filters = {}
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine
        }
        else if(req.query.zipcode){
            filters.zipcode = req.query.zipcode
        }
        else if(req.query.name){
            filters.name = req.query.name
        }

        const {restaurantsList, totalNumRestaurants} = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,
        })

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response)
    }
}