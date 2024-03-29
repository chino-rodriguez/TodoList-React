const User = require('../models/userModel');

module.exports.register = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        let redir = { redirect: "/" };
        return res.json(redir);
    })
}

module.exports.getUser = (req, res) => {
    const data = {
        message: "No user logged in",
        user: null
    }
    if (req.user) {
        data.message = "Successfully fetched user data";
        data.user = req.user;
    }
    return res.json(data);
}

module.exports.logout = (req, res) => {
    if (req.user) {
        req.logout();
    }
    return res.redirect('/');
}