import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongoDB/connect.js';

import regularRoutes from './routes/regularRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit : '50mb'}))

app.use('/api/v1/post', regularRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async(req,res) => {
    res.send('Hello From DALL-E');
})

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(4050, () => console.log('Server has started on port http://localhost:4050'))
    } catch(e){
        console.log(e)
    }



    app.listen(8080, () => console.log("Server running on http://localhost:8080"))

}

startServer()