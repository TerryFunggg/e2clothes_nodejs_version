const gqlFetch = require("../myGrapgQLFetch");

exports.index = async (req, res) => {
  let domEl = {
    home: true,
    page_title: "Order",
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
        orders{
          id
          createdAt
          code
          state
        }
      }
    }
  `, token);

  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me
    domEl.user_menus.push(role === 'seller' ? 'Your shop' : 'Apply Shop')
  }
  const orders = data.data.me.orders
  // Reformat the time string
  orders.map(function(order) {
    let date = new Date(order.createdAt);
    date = `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()} ${date.getUTCHours()}:${date.getMinutes()}`
    order.createdAt = date
    return order
  })
  domEl.orders = orders;
  res.render("pages/order", domEl);
}

exports.orderDetail = async (req, res) => {
  const orderId = req.params.orderId

  let domEl = {
    home: true,
    page_title: "Order",
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
      order(id: ${orderId}){
        name
        city
        buildingAddress
        streetAddress
        zipCode
        email
        phone
        state
        createdAt
        products {
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
    domEl.user_menus.push(role === 'seller' ? 'Your shop' : 'Apply Shop')
    domEl.order = data.data.order
    let products = data.data.order.products;
    let totalPrice = 0;
    products = products.reduce(function(prev, product) {
      if (prev.hasOwnProperty(product.name)) {
        prev[product.name].quality++
        totalPrice += Number(prev[product.name].price)
      } else {
        prev[product.name] = {
          id: product.id,
          name: product.name,
          quality: 1,
          price: product.price,
          images: product.images,
        }
        totalPrice += Number(prev[product.name].price)
      }
      return prev;
    }, {})
    domEl.totalPrice = totalPrice;
    domEl.products = products
  }
  res.render("pages/orderDetail", domEl);
}
