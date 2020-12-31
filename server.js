const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 5000;
var app = express();
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'))

app.use((req,res,next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`
fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
        console.log("unable to log to the server")
    }
})
console.log(log)
next();
})

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle:'Website Under Maintenance',
//         currentYear: new Date().getFullYear(),
//     })
// })

app.get('/', (req, res)=>{
res.render('home.hbs',{
    pageTitle:'My Node Website',
    currentYear: new Date().getFullYear(),
})
})

app.get('/about',(req, res)=>{
    res.render('about.hbs', {
        pageTitle:'Welcome About Page',
        currentYear: new Date().getFullYear(),
    })
})

app.get('/projects',(req, res)=>{
    res.render('projects.hbs', {
        pageTitle:'Projects Available ',
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Page Not found"
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})
