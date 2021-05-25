const router = require("express").Router();
const gqlFetch = require("./myGrapgQLFetch");
const Validation = require("./validation");
const pug = require("pug");

// Controllers
const Home = require('./controllers/home_controller')
const Account = require('./controllers/account_controller');
const Market = require('./controllers/market_controller');
const Product = require('./controllers/products_controller');


// Route section
router.get("/", Home.index)
router.get("/login", Account.login)
router.post("/login", Account.verifyLogin)
router.get("/signup", Account.signup)
router.post("/signup", Account.verifySignUp)
router.get("/market", Market.index)
router.get("/product/:productId", Product.index)

module.exports = router;
