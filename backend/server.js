import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { setAsyncLocalStorage } from './middlewares/setupAls.middleware.js'
import { connect } from './utils/db.service.js'

import authRoutes from './routes/auth.routes.js'
import launchersRoutes from './routes/launchers.routes.js'

dotenv.config()

const app = express()

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl)
    console.log('req.body', req.body)
    next() 
})

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

const corsOptions = {
    origin(origin, cb) {
        if(!origin) return cb(null, true)
        if(allowedOrigins.includes(origin)) return cb(null, true)
            return cb(new Error(`cors blocked for origin ${origin}`))
    },
    credentials:true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(setAsyncLocalStorage)


app.use('/api/auth',authRoutes)
app.use('/api/launchers', launchersRoutes)


const port  = process.env.PORT || 3030
app.listen(port , async ()=> {
    await connect()
    console.log(`server is running on port ${port}`)
})