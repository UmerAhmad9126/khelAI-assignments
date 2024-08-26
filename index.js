const express = require('express');
const { connections } = require('./config/db');
const userRouter = require('./routes/userRoute.js');


const app = express();
app.use(express.json());


// Routes
app.use("/user", userRouter);


app.listen(3000, async () => {
    try {
        await connections
        console.log("Connected to DB")
    } catch (error) {
        console.log('error:', error);
    }
    console.log("Server listening");
});