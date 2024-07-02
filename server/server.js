const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app= express()
const PORT=8081

app.use(express.json());
app.use(cors());

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"crud"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/',(req,res)=>{
    const sql = 'SELECT * FROM students'        
    db.query(sql,(err,data)=>{
        if(err) return res.json('Eroor')
        console.log(data)
        return res.json(data)
    })
})

app.post('/create', (req,res)=>{
    const sql = "INSERT INTO students (`Name`, `Email`) VALUES (?)"
    const values=[
        req.body.name,
        req.body.email
    ]

    // console.log(values)
    result = db.query(sql,[values], (err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
    console.log(result) 
})

app.put('/update/:id', (req, res) => {

    const sql = "UPDATE students SET `Name` = ?, `Email` = ? WHERE `ID` = ?";
    const values = [
        req.body.name,
        req.body.email
    ];  
    const id = req.params.id;
    console.log(id);
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            return res.status(500).json(err); 
        }
        return res.status(200).json(data); 
    });
});

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE ID = ?";
    const id = req.params.id;
    console.log(id);

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err); 
        }
        return res.status(200).json(data); 
    });
});

app.listen(PORT,()=>{
    console.log('Server started at port :', PORT);
})