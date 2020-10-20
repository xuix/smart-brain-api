const handleProfile = (req,res,db) => {
    const {id} = req.params
    console.log(id)


    db('users')
    .select('*').where({id})    
    .then(user=>{
        user.length? res.json(user[0])
                   : res.status('400').json('user not found')

         })
        
    .catch(err=>res.status('400').json(err))
 }
 
 module.exports = {
 
     handleProfile: handleProfile
 }