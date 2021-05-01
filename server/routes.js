const router = require("express").Router();
const gqlFetch = require("./myGrapgQLFetch");
const Validation = require("./validation");
const pug = require("pug");
// const csrf = require('csurf')
// const csrfProtection = csrf({ cookie: true })

router.get("/", async (req, res) => {
  let domEl = { page_title: "Home" };
  if(!req.cookies.token) return res.render("index", domEl);

  let token = req.cookies.token
  let data = await gqlFetch(`
   {
      me {
        firstName
        lastName
        userName
        role
        avatar
      }
    }
  `, token);

  if(!!data?.data?.me ){
    domEl.user = data.data.me;
  }
  res.render("index", domEl);
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.post("/login", async (req, res) => {
  const user = req.body;
  // server side Validation
  const valid = new Validation();
  valid.login(user);
  if (valid.errorsLength() > 0) {
    return res.render("pages/login", { errors: valid.errors });
  }

  let data = await gqlFetch(`
    mutation {
      signInUser(input:{
        email: "${user.email}",
        password: "${user.password}",
    }){
        token
     }
   }
  `);

  // if server reutnr errors or data not include token
  if (data?.errors) {
    let message =
      data?.errors[0].message || "Sorry, There have some problem...";
    return res.render("pages/login", { error: message });
  }
  // TODO: set expires
  const token = data.data.signInUser.token;
  res.cookie("token", token);
  res.redirect("/");
});

module.exports = router;
