const Product = require("../models/pet")


const createProduct = async (req, res) => {
    let { id } = req.cookies
    if (req.file) {
        req.body.img = req.file.path
    }
    req.body.userId = id
    let product = await Product.create(req.body)
    res.send(product)
}


const getProducts = async (req, res) => {


    let products = await Product.find()
    res.send(products)

}

const getProductsByUserId = async (req, res) => {
    let { id } = req.cookies
    let products = await Product.find({ userId: id })
    res.send(products)
}



const getAddProductPage = (req, res) => {

    res.render("addProduct")
}

const getProductsPage = (req, res) => {
    res.render("products")
}

module.exports = { createProduct, getProductsByUserId, getProducts, getAddProductPage, getProductsPage }