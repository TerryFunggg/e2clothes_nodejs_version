const gqlFetch = require("../myGrapgQLFetch");

exports.index = async (req, res) => {
  const productId = req.params.productId
  let domEl = {
    home:true,
    page_title: "Product",
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
     product(id: "${productId}") {
      id
      name
      price
      description
      quality
    }
    }
  `, token);

  console.log(data);

  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me
    domEl.user_menus.push( role === 'seller' ? 'Your shop' : 'Apply Shop' )
  }

  domEl.product = data.data.product

  res.render("pages/product", domEl);
}
