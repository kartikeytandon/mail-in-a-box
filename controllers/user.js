const User = require('../models/user')
const axios = require('axios');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, gender, email, password } = req.body

        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        user = await User.create({
            firstName,
            lastName,
            gender,
            email,
            password,
        })

        res.status(200).json({
            success: true,
            message: `User added Successfully`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}