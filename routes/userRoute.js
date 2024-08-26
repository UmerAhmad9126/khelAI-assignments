
const express = require('express');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/userSchema');
const userRouter = express.Router();

// get request

userRouter.get("/", async () => {
    try {
        const userData = await userSchema.find();
        res.status(200).json({ message: "Data fetched Sucessfully" })
        console.log('userData:', userData);
    } catch (error) {
        res.status(400).send({ msg: "User Request Failed" });

    }
})

// Registration
userRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new userSchema({ email, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(400).send({ msg: "Register Fail", error: error.message });
    }


});

// Login
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });


    try {

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ msg: "Login Success" });

    } catch (error) {
        res.status(400).send({ msg: "Login Failed" });
    }


});

module.exports = userRouter;