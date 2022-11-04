const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 5000;


// Connect DB
require("./src/db/connection");
const pr_route = require('./src/routes/product_route');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//route
app.use(pr_route);


app.listen(port, () => console.log(`Server is running at ${port}`));