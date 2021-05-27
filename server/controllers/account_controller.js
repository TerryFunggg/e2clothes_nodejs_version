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

exports.signup = (req, res) => {
  res.render("pages/signup");
}

exports.verifySignUp = async (req, res) => {
  const user = req.body;
  // server side Validation
  const valid = new Validation();
  valid.login(user);
  if (valid.errorsLength() > 0) {
    return res.render("pages/signup", { errors: valid.errors });
  }

  let data = await gqlFetch(`
    mutation {
      signUpUser(input:{
        email: "${user.email}",
        password: "${user.password}",
        firstName: "${user.firstName}",
        lastName: "${user.lastName}",
        userName: "${user.userName}",
        phone: "${user.phone}"
    }){
        token
     }
   }
  `);

  //  if server reutnr errors or data not include token
  if (data?.errors) {
    let message =
      data?.errors[0].message || "Sorry, There have some problem...";
    return res.render("pages/signup", { error: message });
  }
  //  TODO: set expires
  const token = data.data.signUpUser.token;
  res.cookie("token", token);
  res.redirect("/");
}


exports.userInfo = async (req, res) => {
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
        phone
        email
        numOfCart
        address {
          city
          buildingAddress
          streetAddress
          zipCode
        }
      }
    }
  `, token);
  if (!!data?.data?.me) {
    domEl.user = data.data.me;

    const role = data.data.me
    domEl.user_menus.push( role === 'seller' ? 'Your shop' : 'Apply Shop' )
  }
  res.render("pages/userInfo", domEl);
}

exports.updateUserInfo = async (req, res) => {
  // Bad Handle
  if(!req.body) return;
  const user = req.body;

  let domEl = {
    home:true,
    page_title: "Info",
    user_menus: []
  };
  if (!req.cookies.token) return res.render("index", domEl);


  let token = req.cookies.token
  let data = await gqlFetch(`
    mutation {
      updateUserInfo(input:{
        email: "${user.email}",
        firstName: "${user.firstName}",
        lastName: "${user.lastName}",
        userName: "${user.userName}",
        phone: "${user.phone}"
    }){
        message
        me {
          firstName
          lastName
          userName
          role
          avatar
          phone
          email
          numOfCart
          address {
            city
            buildingAddress
            streetAddress
            zipCode
          }
        }
      }
   }
  `,token);

  console.log(data);
  if (!!data?.data?.updateUserInfo.me) {
    domEl.user = data.data.updateUserInfo.me;
    const role = data.data.updateUserInfo.me.role
    domEl.user_menus.push( role === 'seller' ? 'Your shop' : 'Apply Shop' )
    domEl.msg = data.data.updateUserInfo.message;
  }
  res.render("pages/userInfo", domEl);
}

exports.updateUserAddress = async (req, res) => {
  // Bad Handle
  if(!req.body) return;
  const address = req.body;

  let domEl = {
    home:true,
    page_title: "Info",
    user_menus: []
  };
  if (!req.cookies.token) return res.render("index", domEl);


  let token = req.cookies.token
  let data = await gqlFetch(`
    mutation {
      updateUserAddress(input:{
        city: "${address.city}",
        zipCode: "${address.zipCode}",
        buildingAddress: "${address.buildingAddress}",
        streetAddress: "${address.streetAddress}"
    }){
        message
        me {
          firstName
          lastName
          userName
          role
          avatar
          phone
          email
          numOfCart
          address {
            city
            buildingAddress
            streetAddress
            zipCode
          }
        }
      }
   }
  `,token);

  console.log(data);
  if (!!data?.data?.updateUserAddress.me) {
    domEl.user = data.data.updateUserAddress.me;
    const role = data.data.updateUserAddress.me.role
    domEl.user_menus.push( role === 'seller' ? 'Your shop' : 'Apply Shop' )
    domEl.msg = data.data.updateUserAddress.message;
  }
  res.render("pages/userInfo", domEl);
}
