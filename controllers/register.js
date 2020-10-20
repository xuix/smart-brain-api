const handleRegister = (req,res,db,bcrypt) => {
   console.log('## in handleRegister')

   const saltRounds = 10;
   const {email,name,password} = req.body
   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password, salt);
  // const hash = bcrypt.hashSync(password)
   if (email == undefined) {res.status('400').json('error registering')}
   if (!email || !password || !name) {return res.status('400').json('no blank fields')} 
   else { 
       console.log('!!!Registering',email,name,password)
       db.transaction(trx =>trx
           .insert({hash,email})
           .into('login')
           .then(data=>
               trx('users')
               .returning('*')
               .insert({
                   name:name,
                   email:email,
                   entries:0,
                   joined: new Date()
               })
               .then(user=>res.json(user[0]))
               .catch(err=>res.status('400').json('##error inserting to users'+ err))
           )
           .then(trx.commit)
           .catch(trx.rollback)
       ).catch(err=>res.status('400').json('##error at end users'+err))

       
   }
}

module.exports = {

    handleRegister: handleRegister
}