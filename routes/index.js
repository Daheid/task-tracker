import express from "express"
import registro from "../controllers/auth/registro.js"
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Express" })
})

router.post("/registro", registro)

export default router
