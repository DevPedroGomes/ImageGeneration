// import express from 'express';
// import * as dotenv from 'dotenv';
// import {v2 as cloudinary} from 'cloudinary';

// import Post from '../mongoDB/models/post.js';
// import { Configuration, OpenAIAPI } from 'openai';

// dotenv.config();

// const router = express.Router();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIAPI(configuration);

// router.route('/').get((req, res)=> {
//     res.send('Hello from DALL-E')
// })

// export default router;

import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongoDB/models/post.js';
import { Configuration, OpenAIApi } from 'openai';  // Note a mudança para 'OpenAIApi'

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);  // Note a mudança para 'OpenAIApi'

router.route('/').get((req, res) => {
    res.send('Hello from DALL-E');
});

router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo : image})

    } catch(e){
        console.log(e);
        res.status(500).send(e?.response.data.console.error.message)
    }
})

export default router;
