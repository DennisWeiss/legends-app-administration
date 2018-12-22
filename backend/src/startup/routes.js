module.exports = function(app) {
  const authRoutes = require("../routes/auth");
  const poiRoutes = require("../routes/poi");
  const contentRoutes = require("../routes/content");
  const userRoutes = require("../routes/user");

  app.use("/auth", authRoutes);
  app.use("/poi/content", contentRoutes);
  app.use("/poi", poiRoutes);
  app.use("/users", userRoutes);

  const errorMiddleware = require('../middlewares/error');
  app.use(errorMiddleware);
};
