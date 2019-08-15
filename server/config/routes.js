const controllers = require('../controllers');
const usersRoutes = require('../routes/users');

module.exports = (app) => {
  app.get('/', controllers.home.index);

  app.use('/users', usersRoutes);

  app.all('*', (req, res) => {
    res.status(404);
    res.json({
        message: '404 Not Found!'
    });
  });
};