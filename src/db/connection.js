const mongoose = require("mongoose");

mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true,
  }).then(() =>{ 
    console.log("mongoDB is connected");
}).catch((err) => {
    console.log(err);
});