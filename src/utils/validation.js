const validator = require("validator");

const validateSignUpData = (req) => {    
    const { firstName, lastName, email, password } = req.body;
    console.log(password)
    if (!firstName || !lastName || !email || !password) {
        throw new Error("Please provide all the required fields");
    }
    if (password.length < 8) {
        throw new Error("Password length should be greater than 8");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
};

module.exports= validateSignUpData;