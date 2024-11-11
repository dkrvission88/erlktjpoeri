const express = require("express");
const router = express.Router()
const controllers = require("../controllers/subs_payment_finalControllers");

router.post("/submit-payment-final-data", controllers.submitSubsPaymentFinal);
router.get("/subs-payment-final-list", controllers.getSubsPaymentFinal);
router.put("/update-subs-payment-final", controllers.updateSubsPaymentFinal)

module.exports = router;