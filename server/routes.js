const router = require('express').Router();
const pug = require('pug');
// const csrf = require('csurf')
// const csrfProtection = csrf({ cookie: true })

router.get("/",  (req,res) => {
  let data = {page_title: 'Home'}
  res.render('index', data)
})

router.get('/hi', (req,res) => {
  const msg = "Hello World!"
  res.send(msg)
})


module.exports = router
