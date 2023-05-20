require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const authrouter =require('./routes/auth')
const jobsrouter =require('./routes/jobs')

const connectdb =require('./db/connect')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authuser =require('./middleware/authentication')
app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authrouter);
app.use('/api/v1/jobs',authuser,  jobsrouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {

    connectdb(Mongo_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
