const express = require("express"); // Import express
const fileUpload = require("express-fileupload"); // import express fileUpload

// Import routes
const events = require("./routes/events");
const comments = require("./routes/comments");

const port = process.env.PORT || 3000;

const app = express(); // Make express app

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
app.use("/", events);
app.use("/comments", comments);

/* Run server */
app.listen(port, () => console.log(`Server running on ${port}`));
