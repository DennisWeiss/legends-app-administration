import mongoose from "mongoose";
import appConf from "../../app-conf";

module.exports = function() {
  mongoose.connect(
    appConf.mongoDbUrl,
    { useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};
