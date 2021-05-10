//DAO: Data Access Object

//import { ObjectID } from "bson"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let restaurants //To store a reference to our database

export default class RestaurantsDAO {
    static async injectDB(conn) { //This method is called as soon our server starts, to get a reference to our database "restaurants" in this case
        if (restaurants) { //If already fill it just will return
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants") //If not filled it will fill that reference with our specific database
        } catch (e) {
            console.error(`Unable to stablish  a collection handle in restaurantsDAO: ${e}`)
        }
    }

    static async getRestaurants({
        //Options we created for this method
        filters = null, //To sort things
        page = 0,
        restaurantsPerPage = 20,
        } = {}) {

        let query
        if (filters) {
            if ("name" in filters) {
                //First we need to setup in MongoDB Atlas wich fields from the db will be search from that specific string
                query = { $text: { $search: filters["name"] } } //Because this is a text search and next ones are fields searchs
            }
            else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } } //cuisine is a db field
            }
            else if ("zipcode" in filters) {
                query = { "adress.zipcode": { $eq: filters["zipcode"] } } //adress.zipcode is a db filed
            }
        }

        let cursor
        try {
            cursor = await restaurants.find(query) //This will find all the restaurants form the db with the query we pass in
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            //const totalNumRestaurants = page === 0 ? await restaurants.countDocuments(query) : 0
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

    static async getRestaurantById(id){
        try {
            const pipeline = [
                    {
                        $match: {
                            _id: new ObjectId(id),
                        },
                    },
                    {
                        $lookup: {
                            from: "reviews",
                            let: {
                                id: "_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$restaurant_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "reviews",
                        },
                    },
                    {
                        $addFields: {
                            reviews: "$reviews",
                        },
                    },
            ]
            return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getRestaurantById: ${e}`)
            throw e
        }
    }

    static async getCuisines(){
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines: ${e}`)
            return cuisines
        }
    }
}