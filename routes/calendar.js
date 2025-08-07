const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // カレンダー用2次元配列を作成
  const weeks = [];
  let week = new Array(firstDay).fill('');
  for (let day = 1; day <= lastDate; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push('');
    weeks.push(week);
  }

  res.render('calendar', {
    title: 'カレンダー',
    year,
    month: month + 1,
    weeks,
    isAuth: req.session && req.session.userid ? true : false,
  });
});

module.exports = router;