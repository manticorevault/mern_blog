const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


// App
const app = express()

// Middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())

// CORS Middleware
app.use(cors())

// Access routes
app.get("/api", (req, res) => {
    res.json({ time: Date().toString() })
});

// Access port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})