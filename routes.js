const router = require('express').Router();
const ejs = require('ejs');
// const csrf = require('csurf')
// const csrfProtection = csrf({ cookie: true })

router.get("/",  (req,res) => {
  res.render("index");
})

router.get('/hi', (req,res) => {
  const msg = "Hello World!"
  const html = ejs.render("<%= msg %>", {msg: msg})
  res.send(html)
})


module.exports = router
