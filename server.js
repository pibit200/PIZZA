require('dotenv').config()

const express=require("express") //server creation
const app=express()

const ejs=require("ejs")
const path=require("path")
const expressLayout=require("express-ejs-layouts")
const PORT=process.env.PORT || 3100
const mongoose=require('mongoose')
const session = require('express-session')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')(session)
const passport=require("passport")
const Emitter=require('events')



//database connection
// const url='mongodb://0.0.0.0:27017/pizza';
const url='mongodb://127.0.0.1/pizza';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).on('error',(err) => {
    console.log('Connection failed...')
});




//session store
let mongoStore=new MongoDbStore({
    mongooseConnection:connection,
    collection: 'sessions'
}); 

//event emitter

const eventEmitter=new Emitter()
app.set('eventEmitter', eventEmitter)


//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24} //24 hours

}))

//passport config

const passportInit=require('./app/config/passport');
passportInit(passport)
app.use(passport.initialize())

app.use(passport.session()) 



app.use(flash());

//assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set("view engine","ejs")

require('./routes/web')(app);






const server = app.listen(PORT, ()=>{
    console.log("started at port 3100");
})

//socket

const io=require('socket.io')(server)
io.on('connection',(socket) =>{
   
    console.log("A new user is connected");
    //join 
     socket.on('join',(orderId) =>
     {
        
        
        socket.join(orderId)

     })


})


eventEmitter.on('orderUpdated',(data)=>{
  
  io.to(`order_${data.id}`).emit('orderUpdated', data)


})


eventEmitter.on('orderPlaced',(data)=>{
    io.to('adminRoom').emit('orderPlaced',data)
}) 