const handleSignin=(req,res,db,bcrypt)=>{
    let validated = false
    console.log('##Signing In',req.body.email,req.body.password)
   
       //  else {res.status('400').json('error signing in')}   
       const {email,password} = req.body
       if (!email || !password) {return res.status('400').json('no blank fields')} 

       db('login')
       .select('hash').where({email})    
       .then(data=>{
           console.log('hash=',data)
            if (!data.length) {res.status('400').json('user not found')}
              validated = bcrypt.compareSync(password, data[0].hash,password)
         if (!validated) {res.status('400').json('wrong password.')}
         else {selectUser(req,res,db)}

            })
       .catch(err=>res.status('400').json('1not found in login table' + err));
 
 }

selectUser =(req,res,db)=>{

    const {email}=req.body
    console.log(email)
        db('users')
        .select('*').where({email})    
        .then(user=>{
            console.log(user)
            user.length? res.json(user[0])
                    : res.status('400').json('user not found')
    
            })
            
        .catch(err=>res.status('400').json('##error selecting from users'+err))
}

module.exports ={

    handleSignin: handleSignin

}