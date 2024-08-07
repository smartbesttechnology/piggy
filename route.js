const { userSignupController, usertwillioapiController, usercreateroomapiController } = require("./controller");

const router = require("express").Router();

router.get("/signup", (req, res) => {
    res.send('hello man');
});
router.get("/token", usertwillioapiController);
router.post("/create-room",  usercreateroomapiController);

module.exports = router