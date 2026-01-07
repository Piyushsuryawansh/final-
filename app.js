const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const path=require("path");
const expressSesssion=require("express-session");
const flash=require("connect-flash");

const ownersRouter=require("./routes/ownersRouters");
const productsRouter=require('./routes/productsRouter');
const usersRouter=require('./routes/usersRouter');
const index=require('./routes/index');

require("dotenv").config();

const db=require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSesssion({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("views", path.join(__dirname, "files/views"));
app.set("view engine", "ejs");


app.use("/",index);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products",productsRouter);

app.listen(3000);