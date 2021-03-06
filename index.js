const express = require('express');
const dotenv = require('dotenv');
const path = require("path");

const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const productroute = require("./routes/product");


const stripeRoute = require("./routes/stripe");
const { urlencoded } = require('express');
const cors = require("cors");
const app = express();

dotenv.config();

app.use(express.json());

app.use(urlencoded({extended:true}));


mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("connected to the mongo database");})
.catch((err) => {console.log("database not connected")})

app.use(cors({
    origin:"*",
}));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/product/api/products",productroute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout",stripeRoute);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"/public/images")));
    
    app.get('*',(req,res) => {
        res.status(200).json("welcome to nodeJs");
    })
}

app.listen(process.env.PORT || 3003,()=>{
    console.log(`server is listening on the ports ${process.env.PORT}`);
});
