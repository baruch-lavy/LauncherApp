import express from 'express'
import dotenv from 'dotenv'
import { connect } from './utils/db.service.js'


dotenv.config()

const app = express()


const port  = process.env.PORT || 3030
app.listen(port , async ()=> {
    await connect()
    console.log(`server is running on port ${port}`)
})