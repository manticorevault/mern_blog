const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Bring in the routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user");

// App
const app = express();

// Database
mongoose
    .connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });

// Cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes Middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use("/api", userRoutes);

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});