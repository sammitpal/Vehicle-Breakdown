const express = require('express');
const cors = require('cors');
const monk = require('monk');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose')

const app = express();
const port = process.env.port || 5000;

const db = monk('mongodb+srv://sammit:sammit2000@cluster0.xnpo4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://sammit:sammit2000@cluster0.xnpo4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, () => console.log('connted to db'));

db.then(()=>{
    console.log('Mongo Connected')
}).catch((e)=>{
    console.log(e.message)
})
const servicedata = db.get('services');
const bookings = db.get('bookings');
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.json({
        code: res.statusCode,
        message: 'success'
    })
})
app.post('/services',(req,res)=>{
    const data = {
        sname: req.body.Sname,
        owner: req.body.Owner,
        location: req.body.Location,
        lat: parseFloat(req.body.Lat),
        lan: parseFloat(req.body.Lan)
    }
    servicedata.insert(data).then(insertedData => {
        res.json(insertedData)
    })
})
let getBookData;
app.post('/bookings', async (req,res)=>{
    const data = {
        phone: req.body.phone,
        location: req.body.location,
        userID: req.body.userID,
        shopname: req.body.shop,
        date: new Date()
    }
    getBookData = data;
    bookings.insert(data);
    const book = await bookings.find({userID: req.body.userID});
    if(book){
        res.json(book)
    }
})
app.get('/bookings/:id', async (req,res)=>{
    const { id } = req.params;
    const book = await bookings.find({userID: id});
    if(book){
        res.json(book)
    }
    
})
app.get(`/services`,(req,res)=>{
    servicedata.find().then(servicedata =>{
        res.json(servicedata)
    })
})
app.use('/api/routes',authRoute)

app.listen(port, ()=>{
    console.log("Listening on....",port);
})