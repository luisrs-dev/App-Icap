import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'
import db from './config/mongo'

const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT || 3001

// app.use(cors())
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
// app.use(cors({ origin: 'http://app-login-check.s3-website.eu-north-1.amazonaws.com', credentials: true }));

http://app-login-check.s3-website.eu-north-1.amazonaws.com/login

app.use(express.json())
app.use(cookieParser())

/*
app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Request-With, Content-Type, Accept, Set-Cookie, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
  });
*/

app.use(router)

db().then( () => {
    console.log('Connected to mongodb');
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))