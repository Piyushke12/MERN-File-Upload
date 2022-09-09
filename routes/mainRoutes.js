const route = require('express').Router();
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const { env } = require('process');
const crypto = require('crypto');

require('dotenv').config();

const conn = mongoose.createConnection(env.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const storage = new GridFsStorage({
    url: env.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const fileName = req.body.name + "-img";
                const fileInfo = {
                    filename: fileName,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

route.post('/upload', upload.single('document'), (req, res) => {
    res.send({data:'File uploaded Successfully'});
});

route.get('/files/:name', (req, res) => {
    const fileName = req.params.name+"-img";
    const collection = conn.db.collection('uploads.files');
    const collectionChunk = conn.db.collection('uploads.chunks');

    collection.find({filename : fileName}).toArray((err,files)=>{
        if(err)
        res.send({Error:err.errmsg});
        
        if(!files || files.length == 0)
        res.send({Error:'No File Found'});
        else{
            collectionChunk.find({files_id:files[0]._id})
            .sort({n:1}).toArray((err,chunks)=>{
                if(err)
                res.send({Error:'Error in downloading Data'});

                if(!chunks || chunks.length == 0)
                res.send({Error:'No Data Found'})
                else{
                    let fileData = [];

                    chunks.forEach(chunk=>{
                        fileData.push(chunk.data.toString('base64'));
                    });

                    let finalFile = 'data:' + files[0].contentType + ';base64,' + fileData.join('');
                    res.send({File:files[0],fileData:finalFile});
                }
            });
        }
    });
});

module.exports = route;