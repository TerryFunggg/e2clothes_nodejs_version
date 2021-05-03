const gqlFetch = require("../myGrapgQLFetch");

exports.index = async (req, res) => {
  let domEl = {
    page_title: "Home",
    user_menus: ["Your Profile", "Your Order"]
  };
  if (!req.cookies.token) return res.render("index", domEl);

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

  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me
    domEl.user_menus.push( role === 'seller' ? 'Your shop' : 'Apply Shop' )
  }


  res.render("index", domEl);
}
