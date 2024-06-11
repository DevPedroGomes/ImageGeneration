import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongoDB/models/post.js';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// GET POSTS

router.route('/').get(async (req,res) => {
    try{

        const posts = await Post.find({});

        res.status(200).json({success: true, data: posts})

    } catch(e){
        res.status(500).json({success: false, message: e})

    }
});

// CREATE POSTS

router.route('/').post(async (req,res) => {

    try {

        const {name, prompt, photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo)
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({success: true, data: newPost})

    } catch(e){
        res.status(500).json({success: false, message: e})
}
});
export default router;