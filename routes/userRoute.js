const express = require('express')
const user_route = express();
const session = require('express-session')

const nocache = require('nocache')
user_route.use(nocache())


const config = require('../config/config')
user_route.use(session({
    secret:config.sessionSecret,
    saveUninitialized:true,
    resave:false

}))

const auth = require('../middleware/auth')


user_route.set('view engine','ejs')
user_route.set('views','./views/users')

user_route.use(express.json());
user_route.use(express.urlencoded({extended: true}));

const userController = require('../controllers/userController')

user_route.get('/register',auth.isLogout,userController.loadRegister)
user_route.post('/register',userController.insertUser)

user_route.get('/',auth.isLogout,userController.loginLoad)
user_route.get('/login',auth.isLogout,userController.loginLoad)

user_route.post('/login',userController.verifyLogin)

user_route.get('/home',auth.isLogin,userController.loadHome)

user_route.get('/logout',auth.isLogin,userController.userLogout)
module.exports = user_route