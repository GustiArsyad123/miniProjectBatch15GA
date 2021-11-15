const express = require("express"); // Import express
const fileUpload = require("express-fileupload"); // import express fileUpload

// Import routes
const router = require("./routes/index");

// Import error Handler
const errorHandler = require("./middlewares/errorHandler");

// Make port
const port = process.env.PORT || 3000;

// Make express app
const app = express();

/* Enable req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable req.body (form-data)
app.use(fileUpload());

/* 
  Add public folder to be static folder
*/
app.use(express.static("public"));

/* Make routes */
app.use("/", router);

// If routes not exist
app.all("*", (req, res, next) => {
  next({ statusCode: 404, message: "Endpoint not found" });
});

// Enable error handler
app.use(errorHandler);

/* Run server */
app.listen(port, () => console.log(`Server running on ${port}`));
