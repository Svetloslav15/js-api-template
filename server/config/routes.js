const controllers = require('../controllers');
const usersRoutes = require('../routes/users');
const StatusCodes = require('../enums/status-codes');

module.exports = (app) => {
  app.get('/', controllers.home.index);

  app.use('/users', usersRoutes);

  app.all('*', (req, res) => {
    res.status(StatusCodes.Unauthorized);
    res.json({
        message: '404 Not Found!'
    });
  });
};