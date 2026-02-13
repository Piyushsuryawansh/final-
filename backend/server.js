require('dotenv').config();
const app=require('./src/app');
const connectdb=require('./src/db/db');

console.log("ENV CHECK:", process.env.MONGODB_URL); // 
connectdb();

app.listen(3000,()=>{
    console.log("server running on port 3000");
})