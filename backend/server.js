const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

// App
const app = express()

// Database
mongoose.connect(process.env.DATABASE_CLOUD, { 
                                useNewUrlParser: true, 
                                useCreateIndex: true, 
                                useFindAndModify: false 
                            }
                ).then(() => console.log("Database Connected"));

// Middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes Middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// CORS Middleware
if(process.env.NODE_ENV === "development") {
    app.use(cors( { origin: `${process.env.CLIENT_URL}` }));
}

// Access routes
app.get("/api", (req, res) => {
    res.json({ time: Date().toString() })
});

// Access port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})