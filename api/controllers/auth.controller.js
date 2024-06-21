import User from "../modules/user.model.js";
import bcryptjs from 'bcryptjs'

export const signUp = async(req, res, next) => {
    const {
        userName,
        email,
        password
    } = req.body;

    if (!userName || !email || !password || userName === "" || email === "" || password === "") {
        return res.status(400).json({ message: "All fields are required" })
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json("SignUp Successful");
    } catch (error) {
        next(error);
    }
}