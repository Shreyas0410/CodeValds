var mysql = require('mysql')
const express = require('express')
var cors = require('cors')
const multer = require("multer");
const bodyParser = require('body-parser')
app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.json());



var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"welfare"
});

con.connect(function(err){
    if(err) {
        console.log("HERE")
        throw err
    };
    console.log("connected")
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/CodeByters_TechNightCSI/src/assests')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/complaint', upload.single('file'), function(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const locality = req.body.locality;
    const email_id = req.body.email;
    const file = req.file.filename;

    const sqlInsert = "INSERT INTO COMPLAINT (EMAIL_ID,TITLE,DESCRIPTION,LOCALITY,VOTES,FILE) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(sqlInsert, [email_id,title,description,locality,0,file], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data inserted successfully!");
            res.send({message:"INSERTED"})
        }
    });
})

app.get('/mycomplaint',(req,res) => {
    let email = req.query.mail
    query = "SELECT * FROM COMPLAINT WHERE EMAIL_ID = ?"
    con.query(query,[email],(err,result) => {
        if(err) throw err;
        else{
            console.log(result)
            res.send(result)
        }
    })
})

app.get('/allcomplaint', (req, res) => {
    console.log(req.query.mail)
    query = "SELECT LOCALITY FROM USER WHERE EMAIL_ID = ?";
    const email = req.query.mail;
    var locality = ''
    con.query(query, [email], (err, result) => {
      if (err) throw err; 
      else {
        console.log(result)
        if (result && result.length > 0 && result[0].LOCALITY) {
          locality = result[0].LOCALITY;
          console.log(locality)
          query = "SELECT * FROM COMPLAINT WHERE LOCALITY = ?"
          con.query(query,[locality],(err,result) => {
            if(err) throw err;
            else{
                console.log(result)
                res.send(result)
            }
          })
        }
      }
    });
  });
  


app.post('/changevotes',(req,res) => {
    query = "UPDATE COMPLAINT SET VOTES = VOTES + ? WHERE TITLE = ?"
    let vote = req.body.votes 
    let title = req.body.title 
    con.query(query,[vote,title],(err,result) => {
        if(err) throw err;
        else{
            res.send({message : "CHANGED VOTE"})
        }
    })
})


app.post('/delete',(req,res) => {
    console.log("IDHAR AA RAHA H")
    query = "DELETE FROM COMPLAINT WHERE TITLE = ?"
    console.log(req.body.params.mail)
    let title = req.body.params.heading 
    let email = req.body.params.mail
    con.query(query,[title],(err,result) => {
        if(err) throw err;
    })
    query = "SELECT * FROM COMPLAINT WHERE EMAIL_ID = ?"
    con.query(query,[email],(err,result) => {
        if(err) throw err;
        else{
            res.send(result)
        }
    })
})



app.post('/locality',(req,res) => {
    query = "SELECT * FROM USER WHERE EMAIL_ID = ?"
    con.query(query,[req.body.email],(err,result) => {
        if(err) throw err; 
        else{
            console.log(result)
            if(result.length === 0){
                query = "INSERT INTO USER(EMAIL_ID,NAME,LOCALITY) VALUES(?,?,?)"
                let email = req.body.email 
                let name = req.body.name 
                let locality = req.body.locality 
                con.query(query,[email,name,locality],(err,result) => {
                    if(err) throw err;
                    else{
                        res.send({message : "INSERTED"})
                    }
                })
            }
            else{
                query = "UPDATE USER SET NAME = ? WHERE EMAIL_ID = ?"
                let email = req.body.email 
                let name = req.body.name 
                let locality = req.body.locality 
                con.query(query,[name,email],(err,result) => {
                    if(err) throw err;
                })
                query = "UPDATE USER SET LOCALITY = ? WHERE EMAIL_ID = ?"
                con.query(query,[locality,email],(err,result) => {
                    if(err) throw err;
                    else{
                        res.send({message : "UPDATED"})
                    }
                })
            }
        }
    })
})


app.post("/volunteer",(req,res) => {
    const email = req.body.x 
    const email2 = req.body.email
    const title = req.body.title 
    console.log(email2)
    console.log(email) 
    console.log(title)
    query = "SELECT NAME FROM USER WHERE EMAIL_ID = ?"
    con.query(query,[email2],(err,result) => {
        if(err) throw err;
        else{
            var x = result[0].NAME;
            query = "SELECT VOLUNTEER FROM COMPLAINT WHERE EMAIL_ID = ? AND TITLE = ?";
            con.query(query,[email,title],(err,result) => {
                if(err) throw err;
                else{
                    if(result.length){
                        console.log("Already h")
                        var y = result[0].VOLUNTEER;
                        y = x;
                        query = "UPDATE COMPLAINT SET VOLUNTEER = ? WHERE EMAIL_ID = ? AND TITLE = ?"
                        con.query(query,[y,email,title],(err,result) => {
                            if(err) throw err;
                            else{
                                console.log("Hogaya")
                            }
                        })
                    }
                    else{
                        console.log("Directly Add")
                        query = "UPDATE COMPLAINT SET VOLUNTEER = ? WHERE EMAIL_ID = ? AND TITLE = ?"
                        con.query(query,[x,email,title],(err,result) => {
                            if(err) throw err;
                            else{
                                console.log("Ye bhi hogaya")
                            }
                        })
                    }
                }
            })
        }
    })
})



app.get("getLocality",(req,res) => {
    console.log(req.params)
})

app.listen(3001,() => {
    console.log("Started at 3001")
})