import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app=express();

app.use(express.json());

app.use('/',(req,res)=>{
    return res.send("Server is Working..");
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
