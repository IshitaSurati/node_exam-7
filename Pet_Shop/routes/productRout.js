const { Router } = require("express")
const Author = require("../middleware/author")
const { getProductsPage, createProduct, getProducts, getProductsByUserId, getAddProductPage } = require("../controllers/productCont")
const { upload } = require("../controllers/userController")



const ProductRouter = Router()
ProductRouter.get("/create", Author,getAddProductPage)
ProductRouter.get("/", Author, getProductsPage)
ProductRouter.post("/", Author, upload.single("img"), createProduct)
ProductRouter.get("/all", Author, getProducts)
ProductRouter.get("/id", Author, getProductsByUserId)

module.exports=ProductRouter