const router = require("express").Router();
const gqlFetch = require("./myGrapgQLFetch");
const Validation = require("./validation");
const pug = require("pug");

// Controllers
const Home = require('./controllers/home_controller')
const Account = require('./controllers/account_controller');


// Route section
router.get("/", Home.index)
router.get("/login", Account.login)
router.post("/login", Account.verifyLogin)

module.exports = router;
