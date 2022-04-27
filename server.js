const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require("cors");
const db = require("./app/database/connection");
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser');

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();

//Connect to database
db();
console.log(process.env.MONGO_URL);
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(expressValidator());
app.use(express.static('./app/upload'));
app.use(cookieParser());



const ProductRoutes = require('./app/routes/product_routes');
const CartRoutes = require("./app/routes/cart_routes");
const UserRoutes = require("./app/routes/auth_routes");
ProductRoutes(app);
UserRoutes(app);
CartRoutes(app);
app.listen(port,()=>{
    console.log(`Server is connecting on http://localhost:${port}`);
});
