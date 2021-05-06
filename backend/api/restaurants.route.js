import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./review.controller.js"

const router = express.Router()

//router.route("/").get((req, res) => res.send("Kon'nichiwa sekai"))
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router