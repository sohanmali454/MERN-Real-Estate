import User from "../modules/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signUp = async(req, res, next) => {
    const {
        userName,
        email,
        password
    } = req.body;

    if (!userName || !email || !password || userName === "" || email === "" || password === "") {
        return res.status(400).json({ message: "All fields are required" })
    }

    //encrypt password in hashcode
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
};



export const signIn = async(req, res, next) => {
    const { userNameOrEmail, password } = req.body;
    try {
        console.log('Received signIn request with:', userNameOrEmail, password);
        const validUser = await User.findOne({
            $or: [
                { userName: userNameOrEmail }, { email: userNameOrEmail }
            ]
        });
        console.log('Found user:', validUser);

        if (!validUser) {
            console.log('User not found!');
            return next(errorHandler(404, 'User not found!'));
        }
        //Decrypt password in hashcode
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        console.log('Password is valid:', validPassword);

        if (!validPassword) {
            console.log('Wrong credentials!');
            return next(errorHandler(401, 'Wrong credentials!'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        console.log('Generated token:', token);
        const { password: pass, ...rest } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        error(next);
    }
};