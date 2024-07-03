import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../modules/user.model.js';

export const test = (req, res) => {
    res.json({ message: 'API is Working' });
}

export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!!'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSynce(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                profile: req.body.profile,
            }
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}