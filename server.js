const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");

const app=express();

app.use(cors());

app.use(express.json());

const db=mysql.createConnection({

host:"localhost",

user:"root",

password:"",

database:"studentdb"

});

db.connect();

app.post("/add",(req,res)=>{

const {name,email}=req.body;

db.query(

"INSERT INTO students(name,email) VALUES (?,?)",

[name,email],

(err,result)=>{

if(err) throw err;

res.send("Inserted");

});

});

app.get("/students",(req,res)=>{

db.query("SELECT * FROM students",(err,result)=>{

res.json(result);

});

});

app.delete("/delete/:id",(req,res)=>{

db.query(

"DELETE FROM students WHERE id=?",

[req.params.id],

(err,result)=>{

res.send("Deleted");

});

});

app.listen(3000,()=>{

console.log("Server Running");

});