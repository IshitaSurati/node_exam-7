const express = require('express');
const PORT = process.env.PORT || 8090;
const cors = require("cors")
const cookies = require("cookie-parser");
const path = require('path');
const connectDB = require('./config/db');
const Author = require('./middleware/author');
const userRouter = require('./routes/userRout');
const ProductRouter = require('./routes/productRout');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookies())

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'view'))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use("/user", userRouter)
app.use("/product",ProductRouter)
app.get("/", Author,(req, res) => {
    res.render('index', { title: 'node' })
})



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
