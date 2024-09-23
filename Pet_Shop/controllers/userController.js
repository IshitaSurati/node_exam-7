
const multer = require("multer");
const User = require("../models/user");
const Product = require("../models/pet");
const getUser = async (req, res) => {
    let data = await User.find();
    res.send(data);
};

const createUser = async (req, res) => {


    let { username, email, password } = req.body;
    let profile;

    if (req.files) {
        profile = req.files.map((ele) => ele.path)
    }



    let user = {
        username,
        email,
        password,
        profile,
    };

    const isExists = await User?.findOne({ email: email })

    if (!isExists) {
        let data = await User.create(user);
        res.send(data);
    }
    else {
        res.send({ user: isExists, msg: "user exists" })
    }
};


const updateUser = async (req, res) => {
    let { id } = req.params;
    let data = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.send(data);
};

const deleteUser = async (req, res) => {
    let { id } = req.params;
    let data = await User.findByIdAndDelete(id);
    res.send(data);
};



const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
});

const getIndex = async (req, res) => {
    let { id } = req.cookies;
    let user = await User.findById(id);
    let products = await Product.find(); 

    res.render("index", { user, products }); 
}

const login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
        return res.send("user not found")
    }

    if (user.password !== password) {
        return res.send("password is incorrect")
    }
    res.cookie("id", user.id).send({ user, msg: "logged in successfully" })

}

module.exports = { getUser, updateUser, deleteUser, createUser, upload, getIndex, login };