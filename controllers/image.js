const clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '4810696fc38646558e468fd2fc585003'
 });



const handleImage = (req,res,db) => {
      const {id} = req.body
        console.log(id)
        db('users')
        .increment('entries',1)
        .where({id})    
        .returning('entries')
        .then(entries=>res.json(entries[0]))
            
        .catch(err=>res.status('400').json(err))   
   
 }

const handleImageApiCall =(req,res) => {
  console.log('## doing image api call',req.body.imageURL)


  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,req.body.imageURL)
  .then(response => res.json(response))
    .catch(err => console.log(err));


}

 
 module.exports = {
 
     handleImage: handleImage,
     handleImageApiCall:handleImageApiCall
 }