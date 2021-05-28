const gqlFetch = require("../myGrapgQLFetch");
const Validation = require("../validation");

exports.index = async (req, res) => {
  let domEl = {
    market:true,
    page_title: "Market",
    user_menus: []
  };

  if (!req.cookies.token) return res.render("pages/login");

  let token = req.cookies.token
  let data = await gqlFetch(`
   {
      me {
        firstName
        lastName
        userName
        role
        avatar
        numOfCart
      }
      recommend{
        image
        id
        name
        price
      }
    }
  `, token);

  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me.role
    domEl.haveShop = role === 'seller'
    domEl.recommend = data.data.recommend
  }

  res.render("pages/market", domEl);
}
