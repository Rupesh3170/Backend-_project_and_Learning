const Firebase=require('firebase-admin')

const serviceAccount=require('../drive-658cb-firebase-adminsdk-fbsvc-d95a6fa748.json')



const firebase=Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
   storageBucket:'drive-658cb.firebasestorage.app'

})


module.exports=Firebase

