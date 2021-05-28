const gqlFetch = require("../myGrapgQLFetch");

exports.index = async (req, res) => {
  const productId = req.params.productId
  let domEl = {
    home:true,
    page_title: "Product",
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
     product(id: "${productId}") {
      id
      name
      price
      description
      quality
      shop {
        id
        title
        description
      }
     }
    }
  `, token);



  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me.role
    domEl.haveShop = role === 'seller'
  }

  domEl.product = data.data.product
  domEl.shop = data.data.product.shop

  res.render("pages/product", domEl);
}

exports.createProduct = async (req, res) => {
  let domEl = {
    home: true,
    page_title: "Create Product",
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
  res.render("pages/createProduct", domEl);
}

exports.modifyProduct = async (req,res) => {
 const productId = req.params.productId
  let domEl = {
    home: true,
    page_title: "Modify Product",
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
      product(id: ${productId}){
        id
        name
        image
        price
        description
        quality
      }
    }
  `, token);

  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me.role
    domEl.haveShop = role === 'seller'
    domEl.product = data.data.product
  }
  res.render("pages/modifyProduct", domEl);
}
