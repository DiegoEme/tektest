const express = require("express");
var cors = require('cors')
const app = express();
const patientsRouter = require('./routes/patient')
// const xlsx = require("xlsx"); 
// const fs = require("fs"); 
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
   });
   

app.use(express.json())
//app.use('/patients', async (req, res) => { await patient})

app.use('/', patientsRouter)
app.set('port', process.env.PORT || 3000)

// app.get('/patients', async (req, res) => {
//     const api_url = "https://www.datos.gov.co/resource/gt2j-8ykr.json"
//     await fetch(api_url)
//     .then((response) => response.json())
//     .then((json) => {console.log(json)})
//     .catch((error) => {console.log(error)})
    
// })

// let fileData = fs.readFileSync("./data.json");  
// let rawData = JSON.parse(fileData); 
 
// let workbook = xlsx.utils.book_new(); 
// xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(rawData), "sample"); 
// xlsx.writeFile(workbook,"result.xlsx"); 


app.listen(app.get('port'), () => {
    console.log("server running on port 3000")
})