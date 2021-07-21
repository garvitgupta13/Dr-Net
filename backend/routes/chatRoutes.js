const router = require("express").Router();
const authVerify = require("../middleware/authVerify")
const {
    addConversation,
    viewPatients,
    deletePatientConversation,
    postMessage
} = require("../controllers/chatController");

// TODO - payment middleware
// const paymentVerify = require("../middleware/paymentVerify")

//! Routes From Patient side
// Add his chat to the conversation schema

router.post("/addConversation/:id", authVerify, addConversation);


//! Common Route
router.post("/", authVerify, postMessage);


//! Routes From Doctor side
// View All the Patients that he has to consult with

router.get("/viewPatients", authVerify, viewPatients)

// delete a chat conversation
router.delete("/delete/:id", authVerify, deletePatientConversation)

module.exports = router;