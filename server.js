const express = require('express') 
const cors = require('cors') 
const knex = require('knex')
const bcrypt = require('bcrypt');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });

  


const app = express()

app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db,bcrypt)})

 
app.put('/image',(req,res)=>{image.handleImage(req,res,db,bcrypt)})


app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})


app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.post('/imageApiCall',(req,res)=>{image.handleImageApiCall(req,res)})


   

app.listen(3000, ()=>{
console.log('app is running on port 3000')




})

