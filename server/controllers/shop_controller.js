const gqlFetch = require("../myGrapgQLFetch");

exports.applyShop = async (req, res) => {
  let domEl = {
    home: true,
    page_title: "Shop",
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
    }
  `, token);

  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me.role
    domEl.haveShop = role === 'seller'
  }
  res.render("pages/applyShop", domEl);
}

exports.manageShop = async (req, res) => {
  let domEl = {
    home: true,
    page_title: "Manage Your Shop",
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
        shop {
          title
          description
          logo
          address{
            city
            buildingAddress
            streetAddress
            zipCode
          }
          products{
            id
            name
            price
            image
            quality
          }
        }
      }
    }
  `, token);
  console.log(data);
  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me.role
    domEl.haveShop = role === 'seller'
    domEl.shop = data.data.me.shop
    domEl.products = data.data.me.shop.products
  }
  res.render("pages/manageShop", domEl);
}
