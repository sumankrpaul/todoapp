import express from "express";
const port = process.env.PORT || 4000
const app = express();

app.get("/", (req, res)=>{
    res.json({ message: "Yea!!!" });
})

app.listen(port, ()=>{ console.log("app is running at", port) })