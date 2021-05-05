import express from "express"

const router = express.Router()

router.route("/").get((req, res) => res.send("Kon'nichiwa sekai"))

export default router