const gqlFetch = require("../myGrapgQLFetch");
const Validation = require("../validation");

exports.login = (req, res) => {
  res.render("pages/login");
}

exports.verifyLogin = async (req, res) => {
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
}
