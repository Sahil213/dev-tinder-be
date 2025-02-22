const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sahildesai213:Ss2$Aa1$@hellonode.stpca.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
