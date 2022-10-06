var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});
router.get('/call', function(req, res, next) {
  res.render('call', { title: 'call' });
});
router.get('/sms', function(req, res, next) {
  res.render('sms', { title: 'sms' });
});
router.get('/cam', function(req, res, next) {
  res.render('cam', { title: 'cam' });
});
router.get('/mic', function(req, res, next) {
  res.render('mic', { title: 'mic' });
});
router.get('/files', function(req, res, next) {
  res.render('files', { title: 'files' });
});
router.get('/img', function(req, res, next) {
  res.render('img', { title: 'img' });
});
module.exports = router;
