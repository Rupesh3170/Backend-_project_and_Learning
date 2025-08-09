const multer=require('multer')
const firebaseStorage=require('multer-firebase-storage')
const firebase=require('./firebase.config')
const serviceAccount=require('../drive-658cb-firebase-adminsdk-fbsvc-d95a6fa748.json')


const storage=firebaseStorage({

    credentials:firebase.credential.cert(serviceAccount),
        bucketName: 'drive-658cb.firebasestorage.app',
        unique:true





})

const upload=multer({
    storage:storage,
})
module.exports=upload;