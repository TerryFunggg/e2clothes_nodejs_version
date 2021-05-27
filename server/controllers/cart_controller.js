const gqlFetch = require("../myGrapgQLFetch");

exports.index = async (req, res) => {
  let domEl = {
    home:true,
    page_title: "Cart",
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
        cart {
          id
          name
          price
          images
        }
      }
    }
  `, token);

  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me
    domEl.user_menus.push( role === 'seller' ? 'Your shop' : 'Apply Shop' )
  }
  let cart = data.data.me.cart
  // restruct the cart, filter the duplicat
  let totalPrice = 0;
  cart = cart.reduce(function(prev, product){
    if(prev.hasOwnProperty(product.name)){
      prev[product.name].quality++
      totalPrice += Number(prev[product.name].price)
    }else{
      prev[product.name] = {
        id: product.id,
        name: product.name,
        quality:1,
        price: product.price,
        images: product.images,
      }
      totalPrice += Number(prev[product.name].price)
    }
    return prev;
  },{})
  domEl.cart = cart;
  domEl.totalPrice = totalPrice;
  res.render("pages/cart", domEl);
}
