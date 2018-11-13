module.exports = function(app) {
  //const authRoutes = require("../routes/auth");
  const poiRoutes = require("../routes/poi");

 // app.use("/auth", authRoutes);
  app.use("/poi", poiRoutes);
};
