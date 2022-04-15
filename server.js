const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require("cors");
const db = require("./app/database/connection");
const setupAuthRoutes = require('./app/routes/auth_routes');
const expressValidator = require('express-validator')

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();

//Connect to database
db();
console.log(process.env.MONGO_URL);
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(expressValidator());

// app.get("/",(req,res)=>{
//     res.send({message:"haha"})
// })
setupAuthRoutes(app)
app.listen(port,()=>{
    console.log(`Server is connecting on http://localhost:${port}`);
});
