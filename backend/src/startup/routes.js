module.exports = function(app) {

  const auth = require('../middlewares/authentication')  
  const permission = require('../middlewares/authorization');

  const authRoutes = require("../routes/auth");
  const poiRoutes = require("../routes/poi");
  const contentRoutes = require("../routes/content");
  const userRoutes = require("../routes/user");
  const beaconRoutes = require("../routes/beacon");

  app.use("/auth", authRoutes);
  app.use("/poi/content", contentRoutes);
  app.use("/poi", poiRoutes);
  app.use("/users", auth, permission('ADMIN'), userRoutes);
  app.use("/beacon", auth, permission('EDIT_BEACON'), beaconRoutes);

  const errorMiddleware = require('../middlewares/error');
  app.use(errorMiddleware);
};
