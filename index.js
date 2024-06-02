const express = require('express');
const cors=require("cors")
const {Client}=require("pg")
const app=express()
app.use(express.json())
app.use(cors())

const sql=new Client({
    user:"ganesh",
    host:"late-grivet-9239.7tc.aws-eu-central-1.cockroachlabs.cloud"
    ,database:"shoes",
    password:"RnVA1ZpCiCpvnp17YIEbBA",
    port:"26257",
    ssl: {
        rejectUnauthorized: false, // for development purposes
        // You can also provide a ca certificate if needed
        // ca: fs.readFileSync('/path/to/ca-certificate.crt').toString(),
      }

})
sql.connect()
.then((re)=>console.log("connected"))
.catch((re)=>console.log(re))
app.listen(3000,()=>{
    console.log("runer")
})
app.post("/data",async(request,response)=>{
     
     const{name,dateOfBirth,contactNumber,email,description}=request.body
     const query = `
    INSERT INTO users (name, date_of_birth, contact_number, email, description)
    VALUES ($1, $2, $3, $4, $5)`;
    const values = [name, dateOfBirth, contactNumber, email, description];
    const dta=sql.query(query,values,(err,row)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(`sucess`)
            response.json("User Created")
        }
    })
    console.log(name)

})
app.get("/all",(request,response)=>{
     const query=`select * from users`
     sql.query(query,(err,row)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(row["rows"])
            response.json(row["rows"])
        }
     })
})

app.delete(`/delete/:id`,(request,response)=>{
    const userId = request.params.id;
  
    const deleteQuery = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const values = [userId]
    sql.query(deleteQuery,values,(err,row)=>{
        if(err){
            console.log(err)
        }
        else{
            response.json("User Deleted")
        }
    })
})
app.put(`/update/:id`,(request,response)=>{
    const userId = request.params.id;
    const { name, dateOfBirth, contactNumber, email, description } = request.body;
    const updateQuery = `
        UPDATE users
        SET name = $1, date_of_birth = $2, contact_number = $3, email = $4, description = $5
        WHERE id = $6
       
    `;
    const values = [name, dateOfBirth, contactNumber, email, description, userId];
    sql.query(updateQuery,values,(err,row)=>{
        if(err){
            console.log(err)
        }
        else{
            response.json("updated")
        }
    })
})