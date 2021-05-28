const gqlFetch = require("../myGrapgQLFetch");

exports.index = async (req, res) => {
  let domEl = {
    home:true,
    page_title: "Home",
    user_menus: []
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
        numOfCart
      }
      recommend{
        id
        image
      }
    }
  `, token);

  if (!!data?.data?.me) {
    domEl.user = data.data.me;
    const role = data.data.me.role
    domEl.haveShop = role === 'seller'
  }

  // Recommend section
  let recommend = await gqlFetch(`
   {
      recommend{
        id
        image
      }
    }
  `);
    domEl.recommend = data.data.recommend


  res.render("index", domEl);
}
