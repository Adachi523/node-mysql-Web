const express = require('express');
const router = express.Router();
const passport = require("passport");
const knex = require('../db/knex');
const bcrypt = require("bcrypt");

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
  });
});

router.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('signin', { error: 'ログイン失敗', isAuth: false }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.session.userid = user.id;
      return res.redirect('/calendar');
    });
  })(req, res, next);
});

//app.use('/calendar', calendarRouter); //← この行も削除

module.exports = router;