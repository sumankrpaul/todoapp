import express from "express";
import { PrismaClient, User } from "@prisma/client";
const port = process.env.PORT || 4000
const app = express();

const prisma = new PrismaClient();

const testDB = ()=>{
    prisma.user.create({
        data:{
            name:"Test User ",
            email: `user${(+(new Date())).toString().substring(8)}@mail.com`
        }
    }).then(()=>{
        console.log("User got created");
    })
}

app.get("/", (req, res)=>{
    res.json({ message: "Yea!!!" });
})

app.get("/users", (req, res)=>{
    prisma.user.findMany().then((users)=>{
        res.json({user_list: users});
    }).catch(error =>{
        res.json({ message: "Error occured!", error: error })
    })
})

app.get("/test", (req,res)=>{ res.json({ "message":"it worked again"}) })

app.listen(port, ()=>{ console.log("app is running at", port); testDB()})